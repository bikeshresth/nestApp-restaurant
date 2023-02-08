import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ERROR_MSG } from "../../constants/constant";
import { UserEntity } from "../../users/users.entity";

export class CreateBookDto {


    @IsEmpty({ message: ERROR_MSG.CANNOT_PROVIDE_ID })
    id: string

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsEmpty({ message: ERROR_MSG.CANNOT_PROVIDE_ID })
    user: UserEntity;
}