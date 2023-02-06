import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { of } from 'rxjs';
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

    // Get all meals => GET/ meals
    async findAll(): Promise<Meal[]> {
        const meal = await this.mealModel.find();
        return meal
    }

    // Get all meals of restaurant => GET/ meals/ :restaurant
    async findByRestaurant(id: string): Promise<Meal[]> {
        const meals = await this.mealModel.find({ restaurant: id });
        return meals
    }

    //Create a new meal = > POST /meals/:restaurants

    async create(meal: Meal, user: User): Promise<Meal> {
        const data = Object.assign(meal, { user: user?._id })
        //Saving meal ID in the restaurant menu 
        const restaurant = await this.restaurantModel.findById(meal.restaurant)

        if (!restaurant) {
            throw new NotFoundException(ERROR_MSG.RESTAURANT_NOT_FOUND)
        }

        //Check ownership of the restaurant
        if (restaurant.user?.toString() !== user?._id?.toString()) {
            throw new ForbiddenException(ERROR_VALIDATION_MSG.MEAL_FORBIDDNE_MSG)
        }

        const mealCreated = await this.mealModel.create(data);
        restaurant.menu.push(mealCreated.id)
        await restaurant.save();

        return mealCreated;
    }

    //Get a meal with ID => GET /meals/:id
    async findById(id: string): Promise<Meal> {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new BadRequestException(ERROR_MSG.MONGOOSE_ID_ERROR);
        }

        const meal = await this.mealModel.findById(id);
        if (!meal) {
            throw new NotFoundException(ERROR_MSG.MEAL_NOT_FOUND);
        }
        return meal;
    }

    //update meal => PUT/ meals/ :id

    async updateById(id: string, meal: Meal): Promise<Meal> {
        return await this.mealModel.findByIdAndUpdate(id, meal, {
            new: true,
            runValidators: true
        });

    }
}
