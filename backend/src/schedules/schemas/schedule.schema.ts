import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ServiceCategory } from '../../common/enums';

@Schema({ timestamps: true })
export class Schedule extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  technician: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  timeSlot: string;

  @Prop({ type: Types.ObjectId, ref: 'Order' })
  order?: Types.ObjectId;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ enum: ServiceCategory })
  category?: ServiceCategory;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

ScheduleSchema.index({ technician: 1, date: 1 });
ScheduleSchema.index({ isAvailable: 1 });
