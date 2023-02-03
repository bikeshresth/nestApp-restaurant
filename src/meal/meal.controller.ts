import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealService } from './meal.service';
import { Meal } from './schemas/meal.schema';

@Controller('meals')
export class MealController {
    constructor(private mealService: MealService) { }

    @Post()
    createMeal(
        @Body() createMealDto: CreateMealDto,
        @CurrentUser() user: User
    ): Promise<Meal> {
        return this.mealService.create(createMealDto, user)
    }
}
