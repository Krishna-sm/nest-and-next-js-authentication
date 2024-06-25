import { IsEmail, IsNotEmpty } from 'class-validator'
export class Register{


    @IsNotEmpty({message:"Name is Required"})
    name:string

    @IsEmail()
    @IsNotEmpty({ message: "Email is Required" })
    email:string 

    @IsNotEmpty({message:"Password is Required"})
    password:string

}


export class Login {

 
    @IsEmail()
    @IsNotEmpty({ message: "Email is Required" })
    email: string

    @IsNotEmpty({ message: "Password is Required" })
    password: string

}


export class Update {


    @IsEmail()
    @IsNotEmpty({ message: "Email is Required" })
    email: string


    @IsNotEmpty({ message: "Name is Required" })
    name: string
}

export class ChangePassword {



    @IsNotEmpty({ message: "New Password is Required" })
    new_password: string

    @IsNotEmpty({ message: "Old Password is Required" })
    old_password: string
}

export class ForgetPassword {

    @IsEmail()
    @IsNotEmpty({ message: "Email is Required" })
    email: string


}


export class ResetPassword {
    @IsNotEmpty({ message: " Password is Required" })
    password: string

    @IsNotEmpty({ message: "Confirm Password is Required" })
    c_password: string
  


}