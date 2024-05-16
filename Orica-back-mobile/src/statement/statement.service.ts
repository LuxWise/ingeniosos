import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { statemnetDTO } from './dto/statement.dto';

@Injectable()
export class StatementService {
  constructor(private connection: Connection) {}

  async searchStatement(account: string): Promise<statemnetDTO[]> {
    try {
      const statement = await this.connection.query(
        `
        SELECT glaccount, billingdocument, postingdate,
        assignment, documentnumber, netduedate, amountindoc
        FROM accountstatement
        WHERE account = $1;
        `,
        [account],
      );

      // Verificar si el resultado está vacío
      if (statement.length === 0) {
        throw new HttpException(
          'No se encontraron registros para la cuenta especificada',
          HttpStatus.NOT_FOUND,
        );
      }

      return statement.map((state) => ({
        glaccount: state.glaccount,
        billingdocument: state.billingdocument,
        postingdate: state.postingdate,
        assignment: state.assignment,
        documentnumber: state.documentnumber,
        netduedate: state.netduedate,
        amountindoc: state.amountindoc,
      }));
    } catch {
      throw new HttpException('data error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
