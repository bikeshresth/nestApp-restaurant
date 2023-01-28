import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { ERROR_MSG } from 'src/constants/constant';
import { Restaurant } from './schemas/restaurants.schema';

@Injectable()
export class RestaurantsService {

    constructor(@InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>
    ) { }

    //Get all Restaurants => Get Restaurants

    async findAll(query: Query): Promise<Restaurant[]> {
        const resPerPage = 5;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}
        const restaurants = await this.restaurantModel.find({ ...keyword }).limit(resPerPage).skip(skip);
        return restaurants;

    }

    //Create new  Restaurants => POST Restaurants
    async create(restaurant: Restaurant): Promise<Restaurant> {
        const res = await this.restaurantModel.create(restaurant);
        return res;
    }

    //Get Restaurant by ID   => GET restaurants/:id/
    async findById(id: string): Promise<Restaurant> {

        const isValidId = mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new BadRequestException(ERROR_MSG.MONGOOSE_ID_ERROR)
        }
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new NotFoundException(ERROR_MSG.RESTAURANT_NOT_FOUND);
        }
        return restaurant;
    }

    //Update Restaurant by ID   => PUT restaurants/:id/
    async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
        return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
            new: true,
            runValidators: true
        })
    }

    //Delete Restaurant by ID   => DELETE restaurants/:id/
    async deleteById(id: string): Promise<Restaurant> {
        return await this.restaurantModel.findByIdAndDelete(id);
    }
}
