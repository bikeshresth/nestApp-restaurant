import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule { }
