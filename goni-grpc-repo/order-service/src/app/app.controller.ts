/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

interface InventoryService {
  checkStock(data: { productId: string }): Observable<any>;
}

@Controller('order')
export class AppController implements OnModuleInit {
  private inventoryService!: InventoryService;
  constructor(@Inject('INVENTORY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.inventoryService =
      this.client.getService<InventoryService>('InventoryService');
  }

  @Get('check-item')
  async checkItem(@Query('pid') pid: string) {
    const stockStatus = await lastValueFrom(
      this.inventoryService.checkStock({
        productId: pid,
      }),
    );
    console.log(stockStatus);
    if (stockStatus.inStock) {
      return {
        status: 'Available',
        quantity: stockStatus.availableQuantity,
      };
    }
    return {
      status: 'Out of Stock',
    };
  }
}
