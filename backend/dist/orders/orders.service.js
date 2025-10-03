"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
let OrdersService = class OrdersService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async create(orderData) {
        const appReference = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const order = new this.orderModel({ ...orderData, appReference });
        return order.save();
    }
    async findAll(filters) {
        return this.orderModel.find(filters || {}).populate('client technician').exec();
    }
    async findOne(id) {
        return this.orderModel.findById(id).populate('client technician').exec();
    }
    async assignTechnician(id, technicianId) {
        return this.orderModel.findByIdAndUpdate(id, { technician: technicianId, status: 'ASSIGNED' }, { new: true }).populate('client technician').exec();
    }
    async updateStatus(id, status) {
        return this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }
    async checkIn(id, coordinates) {
        return this.orderModel.findByIdAndUpdate(id, {
            checkIn: { timestamp: new Date(), coordinates },
            status: 'IN_PROGRESS'
        }, { new: true }).exec();
    }
    async checkOut(id, coordinates) {
        return this.orderModel.findByIdAndUpdate(id, {
            checkOut: { timestamp: new Date(), coordinates },
            status: 'COMPLETED'
        }, { new: true }).exec();
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrdersService);
//# sourceMappingURL=orders.service.js.map