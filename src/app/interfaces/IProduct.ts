import { IReview } from "./IReview";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    brandID: number;
    reviews?: IReview[];
}