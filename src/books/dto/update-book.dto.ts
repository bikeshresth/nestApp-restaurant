import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ERROR_MSG } from "src/constants/constant";

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
}