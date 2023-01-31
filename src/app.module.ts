import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    RestaurantsModule,
    MongooseModule.forRoot(process.env.DB_URI_LOCAL),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

