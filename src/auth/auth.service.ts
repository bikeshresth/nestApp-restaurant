import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>) { }


    //Register User
    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { name, email, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await this.userModel.create(
            { name, email, password: hashedPassword }
        )
        return user;
    }
}