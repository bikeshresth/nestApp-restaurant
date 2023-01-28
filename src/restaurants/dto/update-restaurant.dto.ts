import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator"
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
    @IsPhoneNumber('US')
    readonly phoneNo: number

    @IsOptional()
    @IsString()
    readonly address: string

    @IsOptional()
    @IsEnum(Category, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_CATEGORY })
    readonly category: Category
}