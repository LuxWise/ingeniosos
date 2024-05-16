import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { shipDTO } from './dto/shipment.dto';

@Injectable()
export class ShipmentService {
  constructor(private connection: Connection) {}

  async searchShip(billoflading: number): Promise<shipDTO[]> {
    try {
      const ship = await this.connection.query(
        `
        SELECT status, billoflading, pol, pod 
        FROM shipments WHERE billoflading	= $1
        `,
        [billoflading],
      );

      return [
        {
          status: ship[0].status,
          billofladin: parseInt(ship[0].billoflading),
          pol: ship[0].pol,
          pod: ship[0].pod,
        },
      ];
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
