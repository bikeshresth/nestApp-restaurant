import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createRestaurantDto } from './dto/create.restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurants.schema';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService) { }


    @Get()
    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.restaurantsService.findAll();
    }

    @Post()
    async createRestaurant(
        @Body()
        restaurant: createRestaurantDto,
    ): Promise<Restaurant> {
        return this.restaurantsService.create(restaurant);
    }

    @Get(':id')
    async getRestaurant(
        @Param('id')
        id: string
    ): Promise<Restaurant> {
        return this.restaurantsService.findById(id);
    }
}
