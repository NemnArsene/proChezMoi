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
exports.SchedulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const schedules_service_1 = require("./schedules.service");
let SchedulesController = class SchedulesController {
    constructor(schedulesService) {
        this.schedulesService = schedulesService;
    }
    create(scheduleData) {
        return this.schedulesService.create(scheduleData);
    }
    findByTechnician(id) {
        return this.schedulesService.findByTechnician(id);
    }
    findAvailable(category) {
        return this.schedulesService.findAvailable(category);
    }
    bookSchedule(id, orderId) {
        return this.schedulesService.bookSchedule(id, orderId);
    }
};
exports.SchedulesController = SchedulesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create schedule' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('technician/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get schedules by technician' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "findByTechnician", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available schedules' }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "findAvailable", null);
__decorate([
    (0, common_1.Patch)(':id/book'),
    (0, swagger_1.ApiOperation)({ summary: 'Book a schedule' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "bookSchedule", null);
exports.SchedulesController = SchedulesController = __decorate([
    (0, swagger_1.ApiTags)('schedules'),
    (0, common_1.Controller)('schedules'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [schedules_service_1.SchedulesService])
], SchedulesController);
//# sourceMappingURL=schedules.controller.js.map