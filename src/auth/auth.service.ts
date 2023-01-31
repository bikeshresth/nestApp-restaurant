import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs'
import { ERROR_MSG } from 'src/constants/constant';
import { LoginDto } from './dto/login.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService) { }


    //Register User
    async signUp(signUpDto: SignUpDto): Promise<User> {
        const { name, email, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const user = await this.userModel.create(
                { name, email, password: hashedPassword }
            )

            return user

        } catch (error) {
            //Handle Duplicate error 
            if (error.code === 11000) {
                throw new ConflictException(ERROR_MSG.DUPLICATE_EMAIL)
            }
        }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email }).select('+password')
        if (!user) {
            throw new UnauthorizedException(ERROR_MSG.USER_NOT_FOUND)
        }

        const isPasswordMacthed = await bcrypt.compare(password, user.password)
        if (!isPasswordMacthed) {
            throw new UnauthorizedException(ERROR_MSG.INVALID_CREDENTIALS)
        }

        const token = await APIFeatures.assignJwtToken(user, this.jwtService)

        return { token };
    }
}