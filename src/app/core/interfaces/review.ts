export interface IReview {
    _id: string;
    text: string;
    userId: string,
    gameId: string,
    rating: number,
    postedAt: string
}