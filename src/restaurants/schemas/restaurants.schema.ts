import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { Category } from "src/constants/enum";
import { Meal } from "src/meal/schemas/meal.schema";

@Schema()
export class Location {

    @Prop({ type: String, enum: ['Point'] })
    type: string

    @Prop({ index: '2dsphere' })
    coordinates: Number[]
    formattedAddress: string
    city: string
    state: string
    zipcode: string
    country: string
}


@Schema(
    { timestamps: true }
)
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

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }])
    menu?: Meal[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)

export { Category };
