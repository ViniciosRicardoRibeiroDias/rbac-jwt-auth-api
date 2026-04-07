import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './auth/public.decorator';

@Controller('auth')
export class AppController {
    constructor(private authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    login(@Request() req) {
        console.log(req.user);
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
