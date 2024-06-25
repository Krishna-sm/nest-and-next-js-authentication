import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/User.models';
import { ChangePassword, ForgetPassword, Login, Register, ResetPassword } from 'src/types/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Update } from '../../types/auth.dto';
import { ForgetPasswordsendEmail } from 'src/mail';

@Injectable()
export class UserService {


        constructor( @InjectModel(User.name) private userModel:Model<User>, private jwtSerice:JwtService ){}

    async registerView(data:Register){


        const chk_user = await this.userModel.findOne({ email: data.email.toLowerCase() })




                if(chk_user){
                    throw new BadRequestException("User Already Exist")
                    return
                }

     const user=  await this.userModel.create({
            email: data.email,
            password: data.password,
            name: data.name
        })
                    // creating token

        const token = await this.jwtSerice.sign({ userId: user ._id})

        return {
            "msg":"Register Successfully",
            "token": token
        }
    }



    async loginView(data: Login) {


        const chk_user = await this.userModel.findOne({ email: data.email.toLowerCase() })


        if (!chk_user) {
            throw new BadRequestException("User Not Exist")
            return
        }



        // password cmpare === string

        const isMatch = await bcrypt.compare(data.password,chk_user.password)
 
        if (!isMatch) {
            throw new BadRequestException("Invalid Credentials")
            return
        }
        // creating token

        const token = await this.jwtSerice.sign({ userId: chk_user._id })
        return {
            "msg": "Login Successfully",
            "token": token
        }
    }

    async profileView(id:string){
            console.log(id);
            
        const chk_user = await this.userModel.findById(id)




        if (!chk_user) {
            throw new BadRequestException("User Not Exist")
            return
        }

        return chk_user
    }


    async updateProfileView(id: string,data:Update) {
        console.log({
            email: data.email,
            name: data.name,
        });

        const chk_user = await this.userModel.findById(id)




        if (!chk_user) {
            throw new BadRequestException("User Not Exist")
            return
        }

        await this.userModel.findByIdAndUpdate(id,{
            email: data.email,
        name: data.name,
        })

        return {
            msg:"Update Successfully"
        }
    }

    async changePasswordView(id: string, data: ChangePassword) {
      

        const chk_user = await this.userModel.findById(id)

        if (!chk_user) {
            throw new BadRequestException("User Not Exist")
            return
        }
        const isMatch = await bcrypt.compare(data.old_password, chk_user.password)

        if (!isMatch) {
            throw new BadRequestException("Password does not match with old password")
            return
        }

        const hash =  await bcrypt.hash(data.new_password,10);




        await this.userModel.findByIdAndUpdate(id, {
            password: hash
        })

        return {
            msg: " Password Change Successfully"
        }
    }

    async forgetPasswordView(data:ForgetPassword){
        // return 

        const chk_user = await this.userModel.findOne({email:data.email.toLowerCase()})

        if (!chk_user) {
            throw new BadRequestException("Account Not Found")
            return
        }

        // email 

        const token = this.jwtSerice.sign({userId:chk_user._id,email:chk_user.email})

        await ForgetPasswordsendEmail(chk_user.email, chk_user.name, token)

        return {
            msg:"Link Sent on your registered email Address"
        }
    }
    


    async ValidateResetPasswordToken(data:{email:string,userId:string}) {
      

        return data.email
    }

    async ResetpasswordView(data: { email: string, userId: string },body:ResetPassword){


        const chk_user = await this.userModel.findById(data.userId)

        if (!chk_user) {
            throw new BadRequestException("Account Not Found")
            return
        }

        if (body.c_password !== body.password){
            throw new BadRequestException("Password and Confirm Password Does Not Match")
            return
        }

        const isMatch = await bcrypt.compare(body.password, chk_user.password)

        if (isMatch) {
            throw new BadRequestException("Do not try old passwords try new")
            return
        }

        const hash = await bcrypt.hash(body.password, 10);




        await this.userModel.findByIdAndUpdate(data.userId, {
            password: hash
        })

        return {
            msg:"Password Reset Successfully",
            "token":""
        }


    }



}
