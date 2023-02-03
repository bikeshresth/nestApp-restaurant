import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ERROR_MSG, ERROR_VALIDATION_MSG } from 'src/constants/constant';
import { Restaurant } from 'src/restaurants/schemas/restaurants.schema';
import { Meal } from './schemas/meal.schema';

@Injectable()
export class MealService {
    constructor(
        @InjectModel(Meal.name)
        private mealModel: mongoose.Model<Meal>,
        @InjectModel(Restaurant.name)
        private restaurantModel: mongoose.Model<Restaurant>
    ) { }


    //Create a new meal = > POST /meals/:restaurants

    async create(meal: Meal, user: User): Promise<Meal> {
        const data = Object.assign(meal, { user: user._id })
        //Saving meal ID in the restaurant menu 
        const restaurant = await this.restaurantModel.findById(meal.restaurant)

        if (!restaurant) {
            throw new NotFoundException(ERROR_MSG.RESTAURANT_NOT_FOUND)
        }

        //Check ownership of the restaurant
        if (restaurant.user.toString() !== user._id.toString()) {
            throw new ForbiddenException(ERROR_VALIDATION_MSG.MEAL_FORBIDDNE_MSG)
        }

        const mealCreated = await this.mealModel.create(data);
        restaurant.menu.push(mealCreated.id)
        await restaurant.save();

        return mealCreated;
    }
}
