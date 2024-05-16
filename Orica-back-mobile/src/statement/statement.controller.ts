import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatementService } from './statement.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('statement')
export class StatementController {
  constructor(private statementService: StatementService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllQuotes(@Query('id') id: string) {
    return this.statementService.searchStatement(id);
  }
}
