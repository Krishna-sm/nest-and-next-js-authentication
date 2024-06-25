"use client";
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import React from 'react'

const IndexView = () => {

    const {data ,logoutUser} = useAuth()



  return (
    <div className='w-full flex items-center justify-center min-h-[80vh]'>
          <div className="w-1/3 border min-h-20 p-5 flex flex-col gap-y-4">
          <div className="mb-3 border-b mx-5">
          <h1 className="text-2xl">Profile</h1>
          </div>
        <h1 className="text-white text-lg capitalize">Name: {data && data.name} </h1>
        <h1 className="text-white text-lg">Email: {data && data.email } </h1>
        <h1 className="text-white text-lg">
          <button onClick={logoutUser} className='px-6 py-2 rounded-md bg-green-400'>Logout</button> </h1>


        <p>Want to Update Your Profile : <Link className='text-green-500' href={'/update-profile'}>Update Profile</Link> </p>
        <p>Want to Change Password : <Link className='text-green-500' href={'/change-password'}>change-password</Link> </p>

          </div>

    </div>
  )
}

export default IndexView