import { Controller, Get } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurants.schema';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService) { }


    @Get()
    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.restaurantsService.findAll();
    }
}
