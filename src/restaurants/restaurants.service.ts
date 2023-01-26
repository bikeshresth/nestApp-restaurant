import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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
}
