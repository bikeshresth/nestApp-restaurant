
import { UserEntity } from "../users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class BookEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    author: string

    @ManyToOne(() => UserEntity, (user) => user.books)
    user: UserEntity
}