import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ERROR_MSG } from "../../constants/constant";
import { UserEntity } from "../../users/users.entity";

export class UpdateBookDto {


    @IsEmpty({ message: ERROR_MSG.CANNOT_PROVIDE_ID })
    id: string

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    author: string;

    @IsEmpty({ message: ERROR_MSG.CANNOT_PROVIDE_ID })
    user: UserEntity;
}