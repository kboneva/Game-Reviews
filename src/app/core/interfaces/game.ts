import { IBase } from "./base";
import { IReview } from "./review";

export interface IGame extends IBase {
    developer: string;
    genre: string[];
    releaseDate: string;
    reviews: IReview[];
}