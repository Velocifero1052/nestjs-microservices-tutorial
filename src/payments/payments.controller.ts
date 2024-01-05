import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos/createPaymentDto';

@Controller('payments')
export class PaymentsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  createPayment(@Body() paymentDto: CreatePaymentDto) {
    console.log('Message in payment controller from user: ');
    console.log(paymentDto);
    console.log('-----------------------------------------');
    this.natsClient.emit('createPayment', paymentDto);
  }
}
