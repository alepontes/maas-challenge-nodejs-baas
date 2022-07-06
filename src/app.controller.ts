import { Controller, Request, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any, @Body() body: LoginDto) {
    return this.authService.login(req.user);
  }
}
