import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from './schemas/schedule.schema';

@Injectable()
export class SchedulesService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<Schedule>) {}

  async create(scheduleData: any) {
    const schedule = new this.scheduleModel(scheduleData);
    return schedule.save();
  }

  async findByTechnician(technicianId: string) {
    return this.scheduleModel.find({ technician: technicianId }).populate('order').exec();
  }

  async findAvailable(category?: string) {
    const query: any = { isAvailable: true };
    if (category) {
      query.category = category;
    }
    return this.scheduleModel.find(query).populate('technician').exec();
  }

  async bookSchedule(id: string, orderId: string) {
    return this.scheduleModel.findByIdAndUpdate(
      id,
      { order: orderId, isAvailable: false },
      { new: true }
    ).exec();
  }
}
