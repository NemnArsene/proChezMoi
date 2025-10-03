import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}

  async initiatePayment(paymentData: any) {
    const payment = new this.paymentModel(paymentData);
    return payment.save();
  }

  async findByOrder(orderId: string) {
    return this.paymentModel.findOne({ order: orderId }).exec();
  }

  async updateStatus(id: string, status: string, transactionId?: string) {
    return this.paymentModel.findByIdAndUpdate(
      id,
      { status, ...(transactionId && { transactionId }) },
      { new: true }
    ).exec();
  }
}
