import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SchedulesService } from './schedules.service';

@ApiTags('schedules')
@Controller('schedules')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create schedule' })
  create(@Body() scheduleData: any) {
    return this.schedulesService.create(scheduleData);
  }

  @Get('technician/:id')
  @ApiOperation({ summary: 'Get schedules by technician' })
  findByTechnician(@Param('id') id: string) {
    return this.schedulesService.findByTechnician(id);
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available schedules' })
  findAvailable(@Query('category') category?: string) {
    return this.schedulesService.findAvailable(category);
  }

  @Patch(':id/book')
  @ApiOperation({ summary: 'Book a schedule' })
  bookSchedule(@Param('id') id: string, @Body('orderId') orderId: string) {
    return this.schedulesService.bookSchedule(id, orderId);
  }
}
