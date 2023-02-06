import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from "typeorm";
import { create } from 'domain';
import { ERROR_MSG } from 'src/constants/constant';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BookEntity)
        private bookModel: Repository<BookEntity>
    ) { }


    async findAll(): Promise<BookEntity[]> {
        return await this.bookModel.find()
    }


    create(book: BookEntity): Promise<BookEntity> {

        const bookObj = this.bookModel.create({
            name: book.name,
            price: book.price,
            author: book.author
        })
        return this.bookModel.save(bookObj)
    }

    async findOne(id: string): Promise<BookEntity> {
        const book = await this.bookModel.findOneBy({ id });

        if (!book) {
            throw new NotFoundException(ERROR_MSG.DATA_NOT_FOUND);
        }

        return book
    }

    async update(id: string, body: BookEntity): Promise<BookEntity> {
        const book = await this.bookModel.findOneBy({ id });

        if (!book) {
            throw new NotFoundException(ERROR_MSG.DATA_NOT_FOUND);
        }
        Object.assign(book, body)

        return this.bookModel.save(book)
    }


    async remove(id: string) {
        const book = await this.bookModel.findOneBy({ id });

        if (!book) {
            throw new NotFoundException(ERROR_MSG.DATA_NOT_FOUND);
        }

        return this.bookModel.remove(book);
    }
}
