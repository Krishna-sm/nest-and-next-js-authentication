"use client";
import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { CgSpinner } from 'react-icons/cg'
import Link from 'next/link'
import * as yup from 'yup'
import { Login, ResetPassword } from '@/auth'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import { AxiosProvier } from '@/AxiosProvider';
const ResetPasswordPage = () => {

    const query = useSearchParams()
    const router = useRouter()
const [isdLoading,setisdLoading ] = useState(true)
const [email,setEmail ]= useState('');


    const validateToken = async(token:string)=>{
        try {
            const res = await AxiosProvier.post("/auth/validate-reset-password-token",{},{
                headers:{
                    Authorization:'Bearer '+token
                }
            })

            setEmail(res.data);
                    

        } catch (error:any) {
            toast.error(error.response.data.message || "something  went wrong");
            router.push("/")
        }finally{
            setisdLoading(false)
        }
    }



    useEffect(()=>{
        const token = query.get("token") ||''
       if(token){
           validateToken(token)
       }
    }, [query])




    // const [isLoading,setIsLoading] = useState(true);
    const { ResetPasswordFn,isLoading } = useAuth()
    const initalValues: ResetPassword = {
        password: '',
        c_password:''
    }

    const validationSchema = yup.object().shape({
        password: yup.string().min(6, "Password should grater than 6 characters").required("password is required"),
        c_password: yup.string().oneOf([yup.ref("password")],"Password and Confirm Password DOes not match").min(6, "Confirm Password  should grater than 6 characters").required("Confirm Password  is required"),
        
    })

    const onSubmitHandler = async (e: ResetPassword, { resetForm }: any) => {
        const token = query.get("token") || ''
        try {
            // toast.success("Login success");
            await ResetPasswordFn(e, token);
            resetForm()

        } catch (error: any) {
            toast.error(error.message)
        }
    }


    if (isdLoading){
        return <div>laoding.....</div>
    }

    return (
        <div className='min-h-[80vh] w-full flex items-center justify-center'>
            <Formik initialValues={initalValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>

                <Form className=" w-full md:w-1/3 lg:w-1/4 border min-h-40 rounded-md shadow-xl p-5">

                    <div className="mb-3 flex flex-col gap-y-1">
                        <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                        <input disabled type="email" readOnly value={email} id="email" className="w-full disabled:text-gray-400 bg-transparent border border-white py-2 rounded-sm px-4" placeholder='Enter Email Address' />
                  

                    </div>

                    <div className="mb-3 flex flex-col gap-y-1">
                        <label htmlFor="password">Password <span className="text-red-500">*</span></label>
                        <Field type="text" name="password" id="password" className="w-full bg-transparent border border-white py-2 rounded-sm px-4" placeholder='*******' />
                        <ErrorMessage name='password' component={'p'} className='text-red-500 text-sm' />



                    </div>
                    <div className="mb-3 flex flex-col gap-y-1">
                        <label htmlFor="c_password">Confirm Password <span className="text-red-500">*</span></label>
                        <Field type="text" name="c_password" id="c_password" className="w-full bg-transparent border border-white py-2 rounded-sm px-4" placeholder='*******' />
                        <ErrorMessage name='c_password' component={'p'} className='text-red-500 text-sm' />



                    </div>
                    <div className="mb-3">
                        <button disabled={isLoading} className='w-full bg-green-600 py-2 rounded-md inline-flex justify-center disabled:bg-green-800 disabled:cursor-not-allowed items-center gap-x-2'>Reset  {isLoading && <CgSpinner className='text-2xl animate-spin' />} </button>
                    </div>

                    
                </Form>
            </Formik>
        </div>
    )
}

export default ResetPasswordPage