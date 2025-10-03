import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('payments')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Initiate payment' })
  initiatePayment(@Body() paymentData: any) {
    return this.paymentsService.initiatePayment(paymentData);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get payment by order ID' })
  findByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.findByOrder(orderId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update payment status' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('transactionId') transactionId?: string
  ) {
    return this.paymentsService.updateStatus(id, status, transactionId);
  }
}
