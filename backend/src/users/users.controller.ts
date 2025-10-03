import { Controller, Get, Param, Patch, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('technicians')
  @ApiOperation({ summary: 'Get all technicians' })
  findTechnicians(@Query('category') category?: string) {
    return this.usersService.findTechnicians(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/technician-status')
  @ApiOperation({ summary: 'Update technician status' })
  updateTechnicianStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.usersService.updateTechnicianStatus(id, status);
  }
}
