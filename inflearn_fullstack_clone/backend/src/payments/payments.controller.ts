import {
  Body,
  Controller,
  Headers,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('verify')
  @UseGuards(AccessTokenGuard)
  async verifyPayment(
    @Body() verifyPaymentDto: VerifyPaymentDto,
    @Req() req: Request,
  ) {
    return this.paymentsService.verifyPayment(verifyPaymentDto, req.user.sub);
  }

  @Post('webhook')
  async handleWebhook(
    @Body() body: string,
    @Headers() headers: Record<string, string>,
  ) {
    this.logger.log('페이먼트 웹훅 받음.');
    return this.paymentsService.handleWebhook(body, headers);
  }
}
