import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(orderData: any) {
    const appReference = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const order = new this.orderModel({ ...orderData, appReference });
    return order.save();
  }

  async findAll(filters?: any) {
    return this.orderModel.find(filters || {}).populate('client technician').exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).populate('client technician').exec();
  }

  async assignTechnician(id: string, technicianId: string) {
    return this.orderModel.findByIdAndUpdate(
      id,
      { technician: technicianId, status: 'ASSIGNED' },
      { new: true }
    ).populate('client technician').exec();
  }

  async updateStatus(id: string, status: string) {
    return this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async checkIn(id: string, coordinates: { lat: number; lng: number }) {
    return this.orderModel.findByIdAndUpdate(
      id,
      {
        checkIn: { timestamp: new Date(), coordinates },
        status: 'IN_PROGRESS'
      },
      { new: true }
    ).exec();
  }

  async checkOut(id: string, coordinates: { lat: number; lng: number }) {
    return this.orderModel.findByIdAndUpdate(
      id,
      {
        checkOut: { timestamp: new Date(), coordinates },
        status: 'COMPLETED'
      },
      { new: true }
    ).exec();
  }
}
