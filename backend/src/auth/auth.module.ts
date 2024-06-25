import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/User.models';
import * as bcrypt from 'bcrypt'
@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name:User.name,
        async useFactory(){

            const schema = UserSchema;

            schema.pre("save",async function(){
              if(this.isModified("password")){
                this.password = await bcrypt.hash(this.password,10)
              }
            })
          return schema

        }
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class AuthModule {}
