"use client";
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { CgSpinner } from 'react-icons/cg'
import Link from 'next/link'
import * as yup from 'yup'
import { Login, Register } from '@/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
const RegisterPage = () => {
    // const [isLoading, setIsLoading] = useState(true);

    const {registerUser,isLoading} = useAuth()


    const router = useRouter()
    const initalValues: Register = {
        email: '',
        password: '',
        name:''
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("Name is Required"),
        email: yup.string().email("Email must be valid").required("Email is Required"),
        password: yup.string().min(6, "Password should grater than 6 characters").required("password is required"),
    })

    const onSubmitHandler = async(e: Register, { resetForm }: any) => {
        try {
            // toast.success("Register success");
            await registerUser(e);

            resetForm();

        } catch (error: any) {
            console.log(error.message);
            
            // console.log(error.response.data.message)
            // toast.error(error.response.data.message)
        }
    }

    return (
        <div className='min-h-[80vh] w-full flex items-center justify-center'>
            <Formik initialValues={initalValues} validationSchema={validationSchema} onSubmit={onSubmitHandler}>

                <Form className=" w-full md:w-1/3 lg:w-1/4 border min-h-40 rounded-md shadow-xl p-5">

                    <div className="mb-3 flex flex-col gap-y-1">
                        <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                        <Field type="name" name="name" id="name" className="w-full bg-transparent border border-white py-2 rounded-sm px-4" placeholder='Enter Your UserName' />
                        <ErrorMessage name='name' component={'p'} className='text-red-500 text-sm' />

                    </div>

                    <div className="mb-3 flex flex-col gap-y-1">
                        <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                        <Field type="email" name="email" id="email" className="w-full bg-transparent border border-white py-2 rounded-sm px-4" placeholder='Enter Email Address' />
                        <ErrorMessage name='email' component={'p'} className='text-red-500 text-sm' />

                    </div>

                    <div className="mb-3 flex flex-col gap-y-1">
                        <label htmlFor="password">Password <span className="text-red-500">*</span></label>
                        <Field type="password" name="password" id="password" className="w-full bg-transparent border border-white py-2 rounded-sm px-4" placeholder='*******' />
                        <ErrorMessage name='password' component={'p'} className='text-red-500 text-sm' />



                    </div>
                    <div className="mb-3">
                        <button type='submit' disabled={isLoading} className='w-full bg-green-600 py-2 rounded-md inline-flex justify-center disabled:bg-green-800 disabled:cursor-not-allowed items-center gap-x-2'>Register  {isLoading && <CgSpinner className='text-2xl animate-spin' />} </button>
                    </div>

                    <div className="mb-3 flex justify-end items-end">
                        <p className="text-sm">Already Have An Account ?   <Link className='text-green-400' href={'/login'}>Login</Link></p>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default RegisterPage