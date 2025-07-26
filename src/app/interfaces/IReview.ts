export interface IReview {
    Id: number;
    Rating: number;
    Comment: string;
    CreatedAt: Date;
    UserID: string;
    ProductID: number;
}