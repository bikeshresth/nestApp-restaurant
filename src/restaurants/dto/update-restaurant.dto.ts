import { IsString } from "class-validator"
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber } from "class-validator/types/decorator/decorators"
import { ERROR_VALIDATION_MSG } from "src/constants/constant"
import { Category } from "../schemas/restaurants.schema"

export class UpdateRestaurantDto {

    @IsString()
    @IsOptional()
    readonly name: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsEmail({}, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_EMAIL_ADDRESS })
    readonly email: string

    @IsOptional()
    @IsPhoneNumber()
    readonly phoneNo: number

    @IsOptional()
    @IsString()
    readonly address: string

    @IsOptional()
    @IsEnum(Category, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_CATEGORY })
    readonly category: Category
}