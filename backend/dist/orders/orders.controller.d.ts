import { OrdersService } from './orders.service';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(orderData: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/order.schema").Order, {}, {}> & import("./schemas/order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/order.schema").Order, {}, {}> & import("./schemas/order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/order.schema").Order, {}, {}> & import("./schemas/order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    assignTechnician(id: string, technicianId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/order.schema").Order, {}, {}> & import("./schemas/order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    checkIn(id: string, coordinates: {
        lat: number;
        lng: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/order.schema").Order, {}, {}> & import("./schemas/order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    checkOut(id: string, coordinates: {
        lat: number;
        lng: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/order.schema").Order, {}, {}> & import("./schemas/order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
