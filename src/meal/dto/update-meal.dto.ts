import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { User } from "../../auth/schemas/user.schema"
import { ERROR_VALIDATION_MSG } from "../../constants/constant"
import { Category, MealCategory } from "../../constants/enum"

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