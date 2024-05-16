import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.dot';

@Injectable()
export class AuthService {
  constructor(
    private connection: Connection,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<AuthResponseDto> {
    try {
      const user = await this.connection.query(
        `
        SELECT users.id, users.name , users.password, users.email, role.typerole AS role
        FROM users
        INNER JOIN role ON users.idrole = role.id 
        WHERE username = $1
        ORDER BY id
        `,
        [username],
      );

      if (!user) {
        throw new HttpException('username is wrong', HttpStatus.UNAUTHORIZED);
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        throw new HttpException('password is wrong', HttpStatus.UNAUTHORIZED);
      }

      const payload = {
        email: user[0].email,
        role: user[0].role,
        id: user[0].id,
        name: user[0].name,
      };
      const token = await this.jwtService.signAsync(payload);

      return {
        token,
        username,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('credentials bad', HttpStatus.UNAUTHORIZED);
    }
  }
}
