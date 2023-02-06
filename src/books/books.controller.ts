import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Panorama } from 'aws-sdk';
import { get } from 'http';
import { Book } from './book.entity';
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
        return this.booksService.create(body)
    }

    @Get(':id')
    async findById(
        @Param('id')
        id: string
    ): Promise<Book> {
        return await this.booksService.findOne(id)
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        body: UpdateBookDto
    ): Promise<Book> {
        return this.booksService.update(id, body)
    }


    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string,
    ): Promise<Book> {
        return this.booksService.remove(id)
    }
}
