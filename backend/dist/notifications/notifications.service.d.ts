export declare class NotificationsService {
    sendSMS(phoneNumber: string, message: string): Promise<{
        success: boolean;
        phoneNumber: string;
        message: string;
    }>;
    notifyOrderStatus(phoneNumber: string, orderId: string, status: string): Promise<{
        success: boolean;
        phoneNumber: string;
        message: string;
    }>;
}
