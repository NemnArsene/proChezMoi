import { Document, Types } from 'mongoose';
import { OrderStatus, ServiceCategory } from '../../common/enums';
export declare class Order extends Document {
    appReference: string;
    client: Types.ObjectId;
    technician?: Types.ObjectId;
    category: ServiceCategory;
    description: string;
    status: OrderStatus;
    address: {
        street: string;
        city: string;
        postalCode: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    scheduledDate?: Date;
    completedDate?: Date;
    checkIn?: {
        timestamp: Date;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    checkOut?: {
        timestamp: Date;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    estimatedPrice?: number;
    finalPrice?: number;
    isPaid: boolean;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any, {}> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Order> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
