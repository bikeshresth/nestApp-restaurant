import { IsNotEmpty } from "class-validator"
import { IsEmail, IsEnum, IsPhoneNumber, IsString } from "class-validator/types/decorator/decorators"
import { ERROR_VALIDATION_MSG } from "src/constants/constant"
import { Category } from "../schemas/restaurants.schema"

export class CreateRestaurantDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsEmail({}, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_EMAIL_ADDRESS })
    readonly email: string

    @IsNotEmpty()
    @IsPhoneNumber('US')
    readonly phoneNo: number

    @IsNotEmpty()
    @IsString()
    readonly address: string

    @IsNotEmpty()
    @IsEnum(Category, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_CATEGORY })
    readonly category: Category
}