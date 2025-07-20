import { IOrderDetails } from "./IOrderDetails";

export interface IOrder {
    id: number;
    orderDate: Date;
    status: number;
    totalAmount: number;
    userID: string;
    deliveryBoyID: string;
    orderTypeID: number;
    orderDetails: IOrderDetails[];
}