import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { logDTO } from './dto/auth.dot';

@Controller('auth')
export class AuthController {
  constructor(private authSrivice: AuthService) {}

  @Get()
  async hello() {
    return 'helloWord';
  }

  @Post('login')
  async getAllUsers(@Body() login: logDTO) {
    return this.authSrivice.login(login.username, login.password);
  }
}
