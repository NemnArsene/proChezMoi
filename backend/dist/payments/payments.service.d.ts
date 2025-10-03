import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';
export declare class PaymentsService {
    private paymentModel;
    constructor(paymentModel: Model<Payment>);
    initiatePayment(paymentData: any): Promise<import("mongoose").Document<unknown, {}, Payment, {}, {}> & Payment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByOrder(orderId: string): Promise<import("mongoose").Document<unknown, {}, Payment, {}, {}> & Payment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateStatus(id: string, status: string, transactionId?: string): Promise<import("mongoose").Document<unknown, {}, Payment, {}, {}> & Payment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
