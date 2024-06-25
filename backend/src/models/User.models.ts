import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>

@Schema({timestamps:true})
export class User{

            @Prop({isRequired:true,trim:true})
            name:string

    @Prop({ isRequired: true, trim: true,unique:true,lowercase:true })
    email: string

    @Prop({ isRequired: true, trim: true  })
    password: string

}


export const UserSchema = SchemaFactory.createForClass(User)