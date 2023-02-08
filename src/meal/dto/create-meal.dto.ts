import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { User } from "../../auth/schemas/user.schema"
import { ERROR_VALIDATION_MSG } from "../../constants/constant"
import { Category, MealCategory } from "../../constants/enum"

export class CreateMealDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @IsNotEmpty()
    @IsEnum(MealCategory, { message: ERROR_VALIDATION_MSG.ENTER_CORRECT_CATEGORY })
    readonly category: MealCategory

    @IsNotEmpty()
    @IsString()
    readonly restaurant: string

    @IsEmpty({ message: "You cannot provide the user ID" })
    readonly user: User
}