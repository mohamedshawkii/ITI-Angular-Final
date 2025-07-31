import { IOrderDetails } from "./IOrderDetails";

export interface IOrder {
    id: number;
    orderDate: Date;
    status: number;
    totalAmount: number;
    deliveryBoyID?: string | null;
    userID: string;
    orderTypeID?: number | null;
    orderDetails: IOrderDetails[];
}