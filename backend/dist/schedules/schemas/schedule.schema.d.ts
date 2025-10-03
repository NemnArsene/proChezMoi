import { Document, Types } from 'mongoose';
import { ServiceCategory } from '../../common/enums';
export declare class Schedule extends Document {
    technician: Types.ObjectId;
    date: Date;
    timeSlot: string;
    order?: Types.ObjectId;
    isAvailable: boolean;
    category?: ServiceCategory;
}
export declare const ScheduleSchema: import("mongoose").Schema<Schedule, import("mongoose").Model<Schedule, any, any, any, Document<unknown, any, Schedule, any, {}> & Schedule & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Schedule, Document<unknown, {}, import("mongoose").FlatRecord<Schedule>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Schedule> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
