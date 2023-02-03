import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";
import { MealCategory } from "src/constants/enum";

@Schema({
    timestamps: true
})
export class Meal {
    @Prop()
    name: string
    @Prop()
    description: string

    @Prop()
    price: number

    @Prop()
    category: MealCategory

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' })
    restaurant: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
}

export const MealSchema = SchemaFactory.createForClass(Meal)
