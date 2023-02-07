import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { model, Model } from 'mongoose'
import { RestaurantsService } from './restaurants.service'
import { Restaurant } from './schemas/restaurants.schema'


const mockRestaurantService = {}
describe('Restaurant Service', () => {


    let service: RestaurantsService;
    let model: Model<Restaurant>;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                RestaurantsService,
                {
                    provide: getModelToken(Restaurant.name),
                    useValue: mockRestaurantService
                }
            ]
        }).compile();

        service = module.get<RestaurantsService>(RestaurantsService)
        model = module.get<Model<Restaurant>>(getModelToken(Restaurant.name))
    })
    it('should be defined', () => {
        expect(service).toBeDefined();
    })
})