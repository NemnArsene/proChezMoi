import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { RegisterDto, LoginDto } from './dto/register.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: unknown;
            email: string;
            role: import("../common/enums").UserRole;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: unknown;
            email: string;
            role: import("../common/enums").UserRole;
        };
    }>;
}
