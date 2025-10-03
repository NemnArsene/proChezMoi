import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderStatus, ServiceCategory } from '../../common/enums';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, unique: true })
  appReference: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  technician?: Types.ObjectId;

  @Prop({ required: true, enum: ServiceCategory })
  category: ServiceCategory;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ type: Object })
  address: {
    street: string;
    city: string;
    postalCode: string;
    coordinates: { lat: number; lng: number };
  };

  @Prop()
  scheduledDate?: Date;

  @Prop()
  completedDate?: Date;

  @Prop({ type: Object })
  checkIn?: {
    timestamp: Date;
    coordinates: { lat: number; lng: number };
  };

  @Prop({ type: Object })
  checkOut?: {
    timestamp: Date;
    coordinates: { lat: number; lng: number };
  };

  @Prop()
  estimatedPrice?: number;

  @Prop()
  finalPrice?: number;

  @Prop({ default: false })
  isPaid: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.index({ client: 1 });
OrderSchema.index({ technician: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ category: 1 });
