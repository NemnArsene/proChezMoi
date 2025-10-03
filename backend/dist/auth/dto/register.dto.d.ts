import { UserRole } from '../../common/enums';
export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
}
export declare class LoginDto {
    email: string;
    password: string;
}
