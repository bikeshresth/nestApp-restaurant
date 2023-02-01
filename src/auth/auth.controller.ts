import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'


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
    ): Promise<{ token: string }> {
        return this.authService.login(login)
    }


    @Get('users')
    async getAllUsers(
        @Query()
        query: ExpressQuery,
    ): Promise<User[]> {
        return this.authService.findAll(query);
    }
}
