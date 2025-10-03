import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
