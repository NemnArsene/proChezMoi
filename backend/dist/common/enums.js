"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategory = exports.PaymentProvider = exports.PaymentStatus = exports.OrderStatus = exports.TechnicianStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["CLIENT"] = "CLIENT";
    UserRole["TECHNICIAN"] = "TECHNICIAN";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var TechnicianStatus;
(function (TechnicianStatus) {
    TechnicianStatus["PENDING"] = "PENDING";
    TechnicianStatus["VALIDATED"] = "VALIDATED";
    TechnicianStatus["REJECTED"] = "REJECTED";
})(TechnicianStatus || (exports.TechnicianStatus = TechnicianStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["ASSIGNED"] = "ASSIGNED";
    OrderStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentProvider;
(function (PaymentProvider) {
    PaymentProvider["ORANGE"] = "ORANGE";
    PaymentProvider["MTN"] = "MTN";
})(PaymentProvider || (exports.PaymentProvider = PaymentProvider = {}));
var ServiceCategory;
(function (ServiceCategory) {
    ServiceCategory["PLUMBING"] = "PLUMBING";
    ServiceCategory["ELECTRICITY"] = "ELECTRICITY";
    ServiceCategory["CARPENTRY"] = "CARPENTRY";
    ServiceCategory["PAINTING"] = "PAINTING";
    ServiceCategory["CLEANING"] = "CLEANING";
    ServiceCategory["HVAC"] = "HVAC";
    ServiceCategory["GARDENING"] = "GARDENING";
    ServiceCategory["OTHER"] = "OTHER";
})(ServiceCategory || (exports.ServiceCategory = ServiceCategory = {}));
//# sourceMappingURL=enums.js.map