import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuoteModule } from './quote/quote.module';
import { ShipmentModule } from './shipment/shipment.module';
import { StatementModule } from './statement/statement.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.dbhost,
      port: 42822,
      username: 'postgres',
      password: 'CWcYkhtDnxCVBkFlaRvHjqOoluCygWmd',
      database: 'railway',
      entities: [],
      synchronize: true,
    }),
    AuthModule,
    QuoteModule,
    ShipmentModule,
    StatementModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
