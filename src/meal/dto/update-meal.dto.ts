import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { User } from "src/auth/schemas/user.schema"
import { ERROR_VALIDATION_MSG } from "src/constants/constant"
import { Category, MealCategory } from "src/constants/enum"

export class UpdateMealDto {
    @IsOptional()
    @IsString()
    readonly name: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(MealCategory, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_CATEGORY })
    readonly category: MealCategory

    @IsOptional()
    @IsString()
    readonly restaurant: string

    @IsEmpty({ message: "You cannot provide the user ID" })
    readonly user: User
}