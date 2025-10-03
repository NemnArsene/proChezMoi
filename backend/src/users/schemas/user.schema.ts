import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, TechnicianStatus, ServiceCategory } from '../../common/enums';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @Prop({ type: Object })
  address?: {
    street: string;
    city: string;
    postalCode: string;
    coordinates?: { lat: number; lng: number };
  };

  @Prop({ type: Object })
  technicianProfile?: {
    status: TechnicianStatus;
    categories: ServiceCategory[];
    experience: number;
    rating: number;
    totalJobs: number;
    documents?: string[];
    availability?: boolean;
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ 'technicianProfile.status': 1 });
UserSchema.index({ 'technicianProfile.categories': 1 });
