import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CounterDTO, QuoteDTO } from './dto/quote.dto';

@Injectable()
export class QuoteService {
  constructor(private connection: Connection) {}

  async viewAllQuotes(): Promise<QuoteDTO[]> {
    try {
      const quotes = await this.connection.query(
        `SELECT id, statusid, TO_CHAR(quote.date, 'YYYY-MM-DD') as date FROM quote ORDER BY id`,
      );
      return quotes.map((quote) => ({
        id: quote.id,
        status: quote.statusid,
        date: quote.date,
      }));
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async selectQuote(number: number): Promise<QuoteDTO[]> {
    try {
      const quote = await this.connection.query(
        `SELECT id, statusid, TO_CHAR(quote.date, 'YYYY-MM-DD') as dateFROM quote WHERE id = $1 `,
        [number],
      );
      return [
        {
          id: quote[0].id,
          status: quote[0].statusid,
          date: quote[0].date,
        },
      ];
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async counterQuotes(): Promise<CounterDTO> {
    try {
      const quote = await this.connection.query(`SELECT COUNT(id) FROM quote`);
      return {
        count: quote[0].count,
      };
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async counterQuote(id: number): Promise<CounterDTO> {
    try {
      const quote = await this.connection.query(
        `SELECT COUNT(id) FROM quote WHERE idcustumer = $1;`,
        [id],
      );
      return {
        count: quote[0].count,
      };
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async counterComplete(id: number): Promise<CounterDTO> {
    try {
      const quote = await this.connection.query(
        `SELECT COUNT(id) FROM quote WHERE statusid = 5 AND idcustumer = $1 `,
        [id],
      );
      return {
        count: quote[0].count,
      };
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async counterToday(id: number): Promise<CounterDTO> {
    try {
      const quote = await this.connection.query(
        `SELECT COUNT(id)
        FROM quote
        WHERE visible = true
        AND idcommercial = $1
        AND CAST(date AS DATE) = CURRENT_DATE;`,
        [id],
      );
      return {
        count: quote[0].count,
      };
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
