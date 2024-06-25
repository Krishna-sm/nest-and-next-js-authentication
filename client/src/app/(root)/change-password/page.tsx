"use client";
import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { CgSpinner } from 'react-icons/cg'
import Link from 'next/link'
import * as yup from 'yup'
import { ChangePassword, Login, Register, Update } from '@/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
const UpdateProfilePage = () => {
    // const [isLoading, setIsLoading] = useState(true);

    const { data, isLoading, ChangePasswordUser } = useAuth()
    const router = useRouter()

    if (!data.email) {
        router.back()
    }

    const initalValues: ChangePassword = {
        // email: ,
        // password: ,
        new_password:'',
        old_password:''
    }

    const validationSchema = yup.object().shape({
        new_password: yup.string().min(6, "Password should grater than 6 characters").required("New password is required"),
        old_password: yup.string().min(6, "Password should grater than 6 characters").required("Old password is required"),

    })

    const onSubmitHandler = async (e: ChangePassword, { resetForm, setValues }: any) => {
        try {
            // toast.success("Register success");
            await ChangePasswordUser(e);

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
                        <label htmlFor="old_password">Old Password <span className="text-red-500">*</span></label>
                        <Field type="old_password" name="old_password" id="old_password" className="w-full bg-transparent border border-white py-2 rounded-sm px-4" placeholder='Enter Old Password' />
                        <ErrorMessage name='old_password' component={'p'} className='text-red-500 text-sm' />

                    </div>
                    <div className="mb-3 flex flex-col gap-y-1">
                        <label htmlFor="new_password">New Password <span className="text-red-500">*</span></label>
                        <Field type="text" name="new_password" id="new_password" className="w-full bg-transparent border border-white py-2 rounded-sm px-4" placeholder='Enter Your UserName' />
                        <ErrorMessage name='new_password' component={'p'} className='text-red-500 text-sm' />

                    </div>



                    <div className="mb-3">
                        <button type='submit' disabled={isLoading} className='w-full bg-green-600 py-2 rounded-md inline-flex justify-center disabled:bg-green-800 disabled:cursor-not-allowed items-center gap-x-2'>Change Password  {isLoading && <CgSpinner className='text-2xl animate-spin' />} </button>
                    </div>


                </Form>
            </Formik>
        </div>
    )
}

export default UpdateProfilePage