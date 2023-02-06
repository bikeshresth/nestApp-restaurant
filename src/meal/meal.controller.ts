import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealService } from './meal.service';
import { Meal } from './schemas/meal.schema';

@Controller('meals')
export class MealController {
    constructor(private mealService: MealService) { }


    @Get()
    async getAllMeals(): Promise<Meal[]> {
        return this.mealService.findAll();
    }

    @Get('restaurant/:id')
    async getMealsByRestaurant(
        @Param('id')
        id: string
    ): Promise<Meal[]> {
        return this.mealService.findByRestaurant(id);
    }

    @Post()
    createMeal(
        @Body() createMealDto: CreateMealDto,
        @CurrentUser() user: User
    ): Promise<Meal> {
        return this.mealService.create(createMealDto, user)
    }

    @Get(':id')
    async getMealById(
        @Param('id')
        id: string
    ): Promise<Meal> {
        return this.mealService.findById(id)
    }
}
