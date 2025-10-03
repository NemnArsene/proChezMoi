import { Document } from 'mongoose';
import { UserRole, TechnicianStatus, ServiceCategory } from '../../common/enums';
export declare class User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
    address?: {
        street: string;
        city: string;
        postalCode: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    technicianProfile?: {
        status: TechnicianStatus;
        categories: ServiceCategory[];
        experience: number;
        rating: number;
        totalJobs: number;
        documents?: string[];
        availability?: boolean;
    };
    isActive: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
