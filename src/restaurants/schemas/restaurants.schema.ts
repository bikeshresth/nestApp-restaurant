import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Category } from "src/constants/constant";

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

    @Prop({ type: Object, ref: 'Location' })
    location?: Location;

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)

export { Category };
