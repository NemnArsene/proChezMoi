import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { RegisterDto, LoginDto } from './dto/register.dto';
import { TechnicianStatus } from '../common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = new this.userModel({
      ...registerDto,
      password: hashedPassword,
      technicianProfile: registerDto.role === 'TECHNICIAN' ? {
        status: TechnicianStatus.PENDING,
        categories: [],
        experience: 0,
        rating: 0,
        totalJobs: 0,
        availability: false,
      } : undefined,
    });

    await user.save();

    return {
      access_token: this.jwtService.sign({ sub: user._id, role: user.role }),
      user: { id: user._id, email: user.email, role: user.role },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this.jwtService.sign({ sub: user._id, role: user.role }),
      user: { id: user._id, email: user.email, role: user.role },
    };
  }
}
