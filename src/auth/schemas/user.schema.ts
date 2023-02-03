import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ERROR_MSG } from "src/constants/constant";
import { UserRoles } from "src/constants/enum";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop()
    name: string;

    @Prop({ unique: [true, ERROR_MSG.DUPLICATE_EMAIL] })
    email: string;

    @Prop({ select: false })
    password: string

    @Prop({ enum: UserRoles, dafault: UserRoles.USER })
    role: UserRoles
}

export const UserSchema = SchemaFactory.createForClass(User)