import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findTechnicians(category?: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateTechnicianStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
