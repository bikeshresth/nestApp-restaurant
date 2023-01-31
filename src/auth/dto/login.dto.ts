import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ERROR_VALIDATION_MSG } from "src/constants/constant";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_EMAIL_ADDRESS })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

}