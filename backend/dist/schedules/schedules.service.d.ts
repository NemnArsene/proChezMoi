import { Model } from 'mongoose';
import { Schedule } from './schemas/schedule.schema';
export declare class SchedulesService {
    private scheduleModel;
    constructor(scheduleModel: Model<Schedule>);
    create(scheduleData: any): Promise<import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByTechnician(technicianId: string): Promise<(import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAvailable(category?: string): Promise<(import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    bookSchedule(id: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, Schedule, {}, {}> & Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
