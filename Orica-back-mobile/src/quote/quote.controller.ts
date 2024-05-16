import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { query } from 'express';

@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllQuotes() {
    return this.quoteService.viewAllQuotes();
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async getQuote(@Query('id') id: number) {
    return this.quoteService.selectQuote(id);
  }

  @Get('counter/quote')
  @UseGuards(AuthGuard)
  async counterQuotes() {
    return this.quoteService.counterQuotes();
  }

  @Get('counter')
  @UseGuards(AuthGuard)
  async counterQuote(@Query('id') id: number) {
    return this.quoteService.counterQuote(id);
  }

  @Get('complete')
  @UseGuards(AuthGuard)
  async CompleteQuotes(@Query('id') id: number) {
    return this.quoteService.counterComplete(id);
  }

  @Get('today')
  @UseGuards(AuthGuard)
  async todayQuotes(@Query('idCommercial') idCommercial: number) {
    return this.quoteService.counterToday(idCommercial);
  }
}
