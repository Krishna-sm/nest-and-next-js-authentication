import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards,Put } from '@nestjs/common';
import { ChangePassword, ForgetPassword, Login, Register, ResetPassword } from 'src/types/auth.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth.guard'; 
import { Update } from '../../types/auth.dto';

@Controller('api/v1/auth')
export class UserController {

    constructor(private userService:UserService){}

        @Post("/register")
        registerView(@Body() data:Register){

                    return this.userService.registerView(data)

          
        }


    @Post("/login")
    loginView(@Body() data: Login) {

        return this.userService.loginView(data)


    }


    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Get("/profile")
   async profileView(@Request() req){ 
        const user = await req?.user;
        console.log(user);
        
        return this.userService.profileView(user?.userId)


    }


    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Put("/profile/update")
    async updateProfileView(@Request() req, @Body() data: Update) {
        const user = await req?.user;
        console.log(user);

        return this.userService.updateProfileView(user?.userId,data)


    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Put("/profile/change-password")
    async changePasswordView(@Request() req, @Body() data: ChangePassword) {
        const user = await req?.user;
        console.log(user);

        return this.userService.changePasswordView(user?.userId, data)


    }

    @Post("/forget-password")
    async forgetPasswordView(@Request() req, @Body() data: ForgetPassword ) {

        return this.userService.forgetPasswordView(data)


    }
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post("/validate-reset-password-token")
    async ValidateResetPasswordToken(@Request() req) {
        
        const user = await req?.user;

        return this.userService.ValidateResetPasswordToken({ email: user.email, userId: user.userId})


    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Put("/reset-password")
    async ResetpasswordView(@Request() req, @Body() data: ResetPassword) {

        const user = await req?.user;

        return this.userService.ResetpasswordView({ email: user.email, userId: user.userId },data)


    }
}
