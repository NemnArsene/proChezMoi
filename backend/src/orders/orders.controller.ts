import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  create(@Body() orderData: any) {
    return this.ordersService.create(orderData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll(@Query() filters: any) {
    return this.ordersService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign technician to order' })
  assignTechnician(@Param('id') id: string, @Body('technicianId') technicianId: string) {
    return this.ordersService.assignTechnician(id, technicianId);
  }

  @Patch(':id/check-in')
  @ApiOperation({ summary: 'Check-in to order' })
  checkIn(@Param('id') id: string, @Body() coordinates: { lat: number; lng: number }) {
    return this.ordersService.checkIn(id, coordinates);
  }

  @Patch(':id/check-out')
  @ApiOperation({ summary: 'Check-out from order' })
  checkOut(@Param('id') id: string, @Body() coordinates: { lat: number; lng: number }) {
    return this.ordersService.checkOut(id, coordinates);
  }
}
