import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('shipment')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {}

  @Get()
  @UseGuards(AuthGuard)
  async searchShip(@Query('id') id: number) {
    return this.shipmentService.searchShip(id);
  }
}
