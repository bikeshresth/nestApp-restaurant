import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    FAST_FOOD = "Fast Food",
    CAFE = "Cafe",
    FINE_DINING = "Fine Dining"
}


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