/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    const pattern = { cmd: 'validate_user' };
    const payload = { userId: Number(userId) };
    const authResponse = await firstValueFrom(
      this.authClient.send(pattern, payload),
    );

    if (authResponse.status === 'success') {
      return {
        message: 'Order Created Successfully',
        user: authResponse.user,
      };
    }
    return { message: 'Failed to create order', reason: authResponse.message };
  }
}
