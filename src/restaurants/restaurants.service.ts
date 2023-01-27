import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ERROR_MSG } from 'src/constants/constant';
import { Restaurant } from './schemas/restaurants.schema';

@Injectable()
export class RestaurantsService {

    constructor(@InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>
    ) { }

    //Get all Restaurants => Get Restaurants

    async findAll(): Promise<Restaurant[]> {
        const restaurants = await this.restaurantModel.find()
        return restaurants;

    }

    //Create new  Restaurants => POST Restaurants
    async create(restaurant: Restaurant): Promise<Restaurant> {
        const res = await this.restaurantModel.create(restaurant);
        return res;
    }

    //Get Restaurant by ID   => GET restaurants/:id/
    async findById(id: string): Promise<Restaurant> {
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new NotFoundException(ERROR_MSG.RESTAURANT_NOT_FOUND);
        }
        return restaurant;
    }
}
