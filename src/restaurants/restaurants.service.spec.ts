import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { model, Model } from 'mongoose'
import { RestaurantsService } from './restaurants.service'
import { Restaurant } from './schemas/restaurants.schema'

const mockRestaurant = {
    "_id": "63db7ad0d47e973533dbc4cd",
    "name": "Matidevi Fast Foood Restaurant",
    "description": "Made from boban",
    "email": "umb@umb.com",
    "phoneNo": 9788246116,
    "address": "Kakni Fish Farm",
    "category": "Fast Food",
    "images": [],
    "menu": [],
    "createdAt": "2023-02-02T08:56:48.255Z",
    "updatedAt": "2023-02-02T08:56:48.255Z"
}
const mockRestaurantService = {
    find: jest.fn(),
}
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

    describe('FindAll', () => {
        it('should get all the restaurants', async () => {
            jest.spyOn(model, 'find').mockImplementationOnce(() => ({
                limit: () => ({
                    skip: jest.fn().mockResolvedValue([mockRestaurant]),
                }),
            } as any));

            const restaurants = await service.findAll({ keyword: 'restaurant' });
            expect(restaurants).toEqual([mockRestaurant])
        })
    })
})