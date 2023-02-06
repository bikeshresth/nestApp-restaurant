import { CloudFormation } from "aws-sdk";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    author: string

}