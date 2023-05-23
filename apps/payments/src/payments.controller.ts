import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/paymentCreateCharge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create-charge')
  @UsePipes(new ValidationPipe())
  async creatCharge(@Payload() data: PaymentCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
