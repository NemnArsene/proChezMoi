import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentStatus, PaymentProvider } from '../../common/enums';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  client: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: PaymentProvider })
  provider: PaymentProvider;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Prop()
  transactionId?: string;

  @Prop()
  externalReference?: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.index({ order: 1 });
PaymentSchema.index({ transactionId: 1 });
