import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create.restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurants.schema';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/schemas/user.schema';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private restaurantsService: RestaurantsService) { }


    @Get()
    async getAllRestaurants(
        @Query()
        query: ExpressQuery,
    ): Promise<Restaurant[]> {
        return this.restaurantsService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createRestaurant(
        @Body()
        restaurant: CreateRestaurantDto,
        @CurrentUser() user: User,

    ): Promise<Restaurant> {
        return this.restaurantsService.create(restaurant, user);
    }

    @Get(':id')
    async getRestaurant(
        @Param('id')
        id: string
    ): Promise<Restaurant> {
        return this.restaurantsService.findById(id);
    }

    @Put(':id')
    async updateRestaurant(
        @Param('id')
        id: string,
        @Body()
        restaurant: UpdateRestaurantDto
    ): Promise<Restaurant> {
        await this.restaurantsService.findById(id);
        return this.restaurantsService.updateById(id, restaurant);
    }

    @Delete(':id')
    async deleteRestaurant(
        @Param('id')
        id: string): Promise<{ deleted: Boolean }> {
        const rest = await this.restaurantsService.findById(id);
        const isDeleted = await this.restaurantsService.deleteImages(rest.images)

        if (isDeleted) {
            this.restaurantsService.deleteById(id);
            return {
                deleted: true
            }
        } else {
            return {
                deleted: false
            }
        }
    }


    @Put('upload/:id')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(
        @Param('id')
        id: string,
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        await this.restaurantsService.findById(id);
        const res = await this.restaurantsService.uploadImages(id, files);
        return res;
    }

}
