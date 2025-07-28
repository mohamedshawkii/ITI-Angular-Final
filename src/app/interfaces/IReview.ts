export interface IReview {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    userID: string;
    productID: number;
}