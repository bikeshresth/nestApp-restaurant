import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Get()
    getAllUsers() {
        return this.userService.findAll();
    }

    @Post('/create')
    createUser(
        @Body() body
    ) {
        const { email, password } = body;
        return this.userService.create(email, password);
    }
}
