import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    RestaurantsModule,
    MongooseModule.forRoot(process.env.DB_URI_LOCAL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

