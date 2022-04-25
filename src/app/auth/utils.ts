import { AbstractControl, ValidatorFn } from "@angular/forms";
import { throwError } from "rxjs";
import { NotificationService, NotificationType } from "../core/services/notification.service";

export function checkPasswords (password: AbstractControl) { 
    const validtorFn: ValidatorFn = (repeatPassword: AbstractControl) => {
      if (password.value !== repeatPassword.value) {
          return {
              passwordsDontMatch: true
          }
      }
  
      return null;
    }
  
    return validtorFn;
  }

export function processSuccess(message: string, notifService: NotificationService) {
  notifService.notify({
    message: message,
    type: NotificationType.Success
  })
}

export function processError(err: any, notifService: NotificationService) {
  if (!err.code) {
    return null;
  }
  const errorCode = err.code.split('/')[1].split('-').join(" ");
  const message = errorCode[0].toUpperCase() + errorCode.substring(1).toLowerCase();
    notifService.notify({
      message: message || 'Something went wrong.',
      type: NotificationType.Error
    })
    return throwError(() => err);
}