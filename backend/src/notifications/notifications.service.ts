import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async sendSMS(phoneNumber: string, message: string) {
    console.log(`Mock SMS to ${phoneNumber}: ${message}`);
    return { success: true, phoneNumber, message };
  }

  async notifyOrderStatus(phoneNumber: string, orderId: string, status: string) {
    const message = `Order ${orderId} status updated to: ${status}`;
    return this.sendSMS(phoneNumber, message);
  }
}
