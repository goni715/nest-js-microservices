/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'validate_user' })
  handleUserValidation(@Payload() data: any) {
    console.log('Auth Service received data: ', data);
    if (data.userId === 1) {
      return {
        status: 'success',
        user: {
          id: 1,
          name: 'Osman Goni',
        },
      };
    }
    return {
      status: 'error',
      message: 'User not found',
    };
  }
}
