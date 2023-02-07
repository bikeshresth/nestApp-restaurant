import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userModel: Repository<UserEntity>
    ) { }


    findAll() {
        return this.userModel.find()
    }

    create(email: string, password: string) {
        const user = this.userModel.create({
            email, password
        })

        return user
    }
}
