# ProcheZMoi - Service Marketplace MVP

## Overview
ProcheZMoi is a mobile-first service marketplace connecting clients with validated technicians for home services (plumbing, electricity, carpentry, painting, cleaning). The MVP features automated scheduling, real-time tracking, and integrated mobile money payments.

**Status**: Backend API and Mock Services Complete ✓  
**Current Phase**: Backend QA Testing  
**Last Updated**: October 3, 2025

## Project Architecture

### Technology Stack
- **Backend**: NestJS 10 + TypeScript
- **Database**: MongoDB (via Nix package)
- **Authentication**: JWT with role-based access (CLIENT, TECHNICIAN, ADMIN)
- **Mock Services**: Express server for Mobile Money (Orange/MTN) and SMS
- **Frontend**: Ionic 7 + Angular (Pending)
- **Environment**: Replit NixOS (no Docker/virtualization)

### Directory Structure
```
├── backend/               # NestJS API (port 3000)
│   ├── src/
│   │   ├── auth/         # JWT authentication & authorization
│   │   ├── users/        # User management & technician validation
│   │   ├── orders/       # Service request lifecycle
│   │   ├── schedules/    # Automated scheduling
│   │   ├── payments/     # Payment tracking
│   │   └── notifications/# SMS notifications
│   └── package.json
├── mock-server/          # Mock integrations (port 3001)
│   ├── server.js         # Orange/MTN Mobile Money + SMS mocks
│   └── package.json
├── scripts/
│   ├── seed.js           # Database seed with sample data
│   ├── test-scenarios.sh # End-to-end cURL test suite
│   └── start-mongo.sh    # MongoDB startup script
└── start.sh              # Backend startup wrapper
```

## Features Implemented

### 1. Authentication & Authorization (✓)
- User registration with email/phone validation
- JWT token-based authentication
- Role-based access control (CLIENT, TECHNICIAN, ADMIN)
- Guards for protected endpoints

### 2. User Management (✓)
- Client and technician profiles
- Admin-only technician validation workflow
- Status tracking (PENDING, VALIDATED, REJECTED, SUSPENDED)
- Category and experience management

### 3. Order Management (✓)
- Service request creation with categories (PLUMBING, ELECTRICITY, CARPENTRY, PAINTING, CLEANING)
- Status lifecycle (PENDING → ASSIGNED → IN_PROGRESS → COMPLETED → CANCELLED)
- Technician assignment (manual or automated)
- Geographic location tracking (coordinates)

### 4. Check-in/Check-out System (✓)
- GPS-based technician check-in at service location
- Check-out with automatic order completion
- Timestamp and coordinate tracking
- Access control (only assigned technician can check-in/out)

### 5. Payment Integration (✓)
- Mock Mobile Money providers (Orange, MTN)
- Payment initiation and confirmation flow
- Status tracking (PENDING, SUCCESS, FAILED)
- Transaction ID management

### 6. Notifications (✓)
- Mock SMS service
- Order status updates
- Payment confirmations

### 7. Automated Scheduling (✓)
- Schedule management for service requests
- Status tracking (SCHEDULED, CONFIRMED, COMPLETED, CANCELLED)
- Duration and note support

## Database Schema

### Users Collection
```typescript
{
  email: string (unique)
  phone: string (unique)
  firstName: string
  lastName: string
  password: string (hashed)
  role: 'CLIENT' | 'TECHNICIAN' | 'ADMIN'
  isActive: boolean
  technicianProfile?: {
    status: 'PENDING' | 'VALIDATED' | 'REJECTED' | 'SUSPENDED'
    categories: Category[]
    experience: number
    rating: number
    totalJobs: number
    availability: boolean
  }
}
```

### Orders Collection
```typescript
{
  appReference: string (unique, e.g., "ORD-1759496570-ABC123")
  client: ObjectId (ref: User)
  technician?: ObjectId (ref: User)
  category: 'PLUMBING' | 'ELECTRICITY' | 'CARPENTRY' | 'PAINTING' | 'CLEANING'
  description: string
  status: 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  address: {
    street: string
    city: string
    postalCode: string
    coordinates: { lat: number, lng: number }
  }
  estimatedPrice: number
  isPaid: boolean
  checkIn?: { timestamp: Date, coordinates: { lat, lng } }
  checkOut?: { timestamp: Date, coordinates: { lat, lng } }
}
```

### Payments Collection
```typescript
{
  order: ObjectId (ref: Order)
  client: ObjectId (ref: User)
  amount: number
  provider: 'ORANGE' | 'MTN'
  phoneNumber: string
  status: 'PENDING' | 'SUCCESS' | 'FAILED'
  transactionId: string (unique)
}
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login (returns JWT)

### Users
- `GET /users` - Get all users (authenticated)
- `GET /users/:id` - Get user by ID
- `GET /users/technicians` - Get validated technicians
- `PATCH /users/:id/technician-status` - Update technician status (admin only)

### Orders
- `POST /orders` - Create service request
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order details
- `PATCH /orders/:id/assign` - Assign technician
- `PATCH /orders/:id/check-in` - Technician check-in
- `PATCH /orders/:id/check-out` - Technician check-out

### Schedules
- `POST /schedules` - Create schedule
- `GET /schedules` - Get all schedules
- `GET /schedules/order/:orderId` - Get schedules for order
- `PATCH /schedules/:id/status` - Update schedule status

### Payments
- `POST /payments` - Create payment record
- `GET /payments` - Get all payments
- `GET /payments/:id` - Get payment by ID
- `GET /payments/order/:orderId` - Get payments for order
- `PATCH /payments/:id/status` - Update payment status

### Notifications
- `POST /notifications` - Create notification
- `GET /notifications` - Get all notifications
- `GET /notifications/user/:userId` - Get user notifications
- `PATCH /notifications/:id/read` - Mark as read

## Mock Services (Port 3001)

### Mobile Money Endpoints
- `POST /api/mobile-money/orange/initiate` - Initiate Orange Money payment
- `POST /api/mobile-money/mtn/initiate` - Initiate MTN Mobile Money payment
- `POST /api/mobile-money/confirm/:transactionId` - Confirm payment
- `GET /api/mobile-money/status/:transactionId` - Check payment status

### SMS Endpoints
- `POST /api/sms/send` - Send SMS notification

## Testing

### Database Seeding
```bash
npm run seed
```
Creates sample data:
- 1 admin user (admin@prochezmoi.cm / password123)
- 3 client users
- 4 technician users (2 validated, 1 pending, 1 rejected)
- 4 service orders
- 6 schedules
- 2 payments

### End-to-End Test Scenarios
```bash
cd scripts && ./test-scenarios.sh
```

Tests 6 complete scenarios:
1. **User Registration** - Client and technician signup
2. **Authentication** - Login and token validation
3. **Technician Validation** - Admin validates technician
4. **Service Request** - Client creates order
5. **Check-in/Check-out** - Technician assignment and tracking
6. **Payment & Notifications** - Mock Mobile Money payment and SMS

The script is idempotent (uses timestamps for unique emails/phones) and works without jq.

## Running the Application

### Start Backend and Mock Server
Both workflows are configured and run automatically:
- **Backend API**: `sh start.sh` (port 3000)
- **Mock Server**: `cd mock-server && npm start` (port 3001)

### Environment Variables
- `SESSION_SECRET` - JWT signing secret (configured)
- `MONGO_URI` - MongoDB connection string (auto-configured)

## User Preferences
- Use NestJS best practices and modular architecture
- Prefer mock services over real integrations for MVP
- Keep code organized in feature modules
- Use TypeScript strict mode
- Follow Cameroon mobile money standards (Orange/MTN)

## Recent Changes

### October 3, 2025
- ✓ Created and validated end-to-end test scenarios script
- ✓ Fixed test script to work without jq dependency (using grep/sed)
- ✓ Made test script idempotent with timestamp-based unique identifiers
- ✓ Verified all 6 scenarios execute successfully
- ✓ Confirmed no LSP errors in codebase
- ✓ Both workflows running without errors

## Next Steps (Pending)
1. **Ionic 7 + Angular Frontend** - Mobile-first UI with pages:
   - Client app (browse services, create requests, track orders)
   - Technician app (view assignments, check-in/out, update status)
   - Admin dashboard (validate technicians, monitor system)
2. **Integration testing** with frontend-backend flow
3. **Deployment configuration** for production

## Known Issues
None currently. All backend functionality tested and working.
