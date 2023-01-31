import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    //Register a new user 
    @Post('/signup')
    signUp(
        @Body()
        user: SignUpDto
    ): Promise<User> {
        return this.authService.signUp(user)
    }


    //Login user 
    @Get("/login")
    async login(
        @Body()
        login: LoginDto
    ): Promise<User> {
        return this.authService.login(login)
    }
}
