import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { MealSchema } from './schemas/meal.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
      name: 'Meal',
      schema: MealSchema
    }
    ]),
    RestaurantsModule
  ],
  controllers: [MealController],
  providers: [MealService]
})
export class MealModule { }
