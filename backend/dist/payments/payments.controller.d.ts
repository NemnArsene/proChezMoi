import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    initiatePayment(paymentData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").Payment, {}, {}> & import("./schemas/payment.schema").Payment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByOrder(orderId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").Payment, {}, {}> & import("./schemas/payment.schema").Payment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateStatus(id: string, status: string, transactionId?: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/payment.schema").Payment, {}, {}> & import("./schemas/payment.schema").Payment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
