import { SchedulesService } from './schedules.service';
export declare class SchedulesController {
    private schedulesService;
    constructor(schedulesService: SchedulesService);
    create(scheduleData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByTechnician(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAvailable(category?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    bookSchedule(id: string, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/schedule.schema").Schedule, {}, {}> & import("./schemas/schedule.schema").Schedule & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
