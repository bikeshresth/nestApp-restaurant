import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Panorama } from 'aws-sdk';
import { get } from 'http';
import { BookEntity } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }


    @Get()
    async getAllBooks() {
        return this.booksService.findAll();
    }

    @Post()
    createBook(@Body() body: CreateBookDto) {
        const user = {
            id: "275cf893-a844-4ea3-b467-e1e881d833f4",
            email: "bishal@heubert.com",
            password: "12345677"

        }
        return this.booksService.create(body, user)
    }

    @Get(':id')
    async findById(
        @Param('id')
        id: string
    ): Promise<BookEntity> {
        return await this.booksService.findOne(id)
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        body: UpdateBookDto
    ): Promise<BookEntity> {
        return this.booksService.update(id, body)
    }


    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string,
    ): Promise<BookEntity> {
        return this.booksService.remove(id)
    }
}
