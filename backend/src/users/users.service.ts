import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findTechnicians(category?: string) {
    const query: any = { role: 'TECHNICIAN', 'technicianProfile.status': 'VALIDATED' };
    if (category) {
      query['technicianProfile.categories'] = category;
    }
    return this.userModel.find(query).select('-password').exec();
  }

  async updateTechnicianStatus(id: string, status: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { 'technicianProfile.status': status },
      { new: true }
    ).select('-password').exec();
  }
}
