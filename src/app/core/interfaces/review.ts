import { IBase } from "./base";
import { IGame } from "./game";

export interface IReview extends IBase {
    rating: number,
    gameId: IGame,
    postedAt: string
}