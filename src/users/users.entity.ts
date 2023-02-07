import { BookEntity } from "src/books/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string

    @Column()
    password: string;

    @OneToMany(() => BookEntity, (book) => book.user)
    books: BookEntity[]
}