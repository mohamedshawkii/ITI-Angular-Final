export interface IPayment {
    paymentMethod: string;
    paymentStatus: string;
    transactionReference: string;
    paymentDate: Date;
    total: number;
    orderId?: number;
  }