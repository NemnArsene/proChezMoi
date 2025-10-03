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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSchema = exports.Schedule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums");
let Schedule = class Schedule extends mongoose_2.Document {
};
exports.Schedule = Schedule;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Schedule.prototype, "technician", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Schedule.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Schedule.prototype, "timeSlot", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Order' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Schedule.prototype, "order", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Schedule.prototype, "isAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: enums_1.ServiceCategory }),
    __metadata("design:type", String)
], Schedule.prototype, "category", void 0);
exports.Schedule = Schedule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Schedule);
exports.ScheduleSchema = mongoose_1.SchemaFactory.createForClass(Schedule);
exports.ScheduleSchema.index({ technician: 1, date: 1 });
exports.ScheduleSchema.index({ isAvailable: 1 });
//# sourceMappingURL=schedule.schema.js.map