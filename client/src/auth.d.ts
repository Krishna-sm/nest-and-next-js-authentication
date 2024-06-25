export interface Login{
    email: string
    password: string
}

export interface Forget {
    email: string
}


export interface Register {
    email: string
    password: string
    name:string
}


export interface Update {
    email: string 
    name: string
}


export interface ChangePassword {
    old_password: string
    new_password: string
}

export interface ResetPassword {
    password: string
    c_password: string
}


export interface User{
    email:string
    name:string 
    _id:string
    createdAt:string
}