import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findTechnicians(category?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTechnicianStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
