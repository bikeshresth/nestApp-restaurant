import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Category } from "src/constants/constant";




@Schema()
export class Restaurant {

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    email: string

    @Prop()
    phoneNo: number

    @Prop()
    address: string

    @Prop()
    category: Category

    @Prop()
    images?: object[] //? Represent optional field
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)

export { Category };
