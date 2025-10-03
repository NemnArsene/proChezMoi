import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
export declare class OrdersService {
    private orderModel;
    constructor(orderModel: Model<Order>);
    create(orderData: any): Promise<import("mongoose").Document<unknown, {}, Order, {}, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(filters?: any): Promise<(import("mongoose").Document<unknown, {}, Order, {}, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    assignTechnician(id: string, technicianId: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    checkIn(id: string, coordinates: {
        lat: number;
        lng: number;
    }): Promise<import("mongoose").Document<unknown, {}, Order, {}, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    checkOut(id: string, coordinates: {
        lat: number;
        lng: number;
    }): Promise<import("mongoose").Document<unknown, {}, Order, {}, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
