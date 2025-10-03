export enum UserRole {
  CLIENT = 'CLIENT',
  TECHNICIAN = 'TECHNICIAN',
  ADMIN = 'ADMIN',
}

export enum TechnicianStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum PaymentProvider {
  ORANGE = 'ORANGE',
  MTN = 'MTN',
}

export enum ServiceCategory {
  PLUMBING = 'PLUMBING',
  ELECTRICITY = 'ELECTRICITY',
  CARPENTRY = 'CARPENTRY',
  PAINTING = 'PAINTING',
  CLEANING = 'CLEANING',
  HVAC = 'HVAC',
  GARDENING = 'GARDENING',
  OTHER = 'OTHER',
}
