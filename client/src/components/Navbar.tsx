"use client";
import { useAuth } from '@/context/auth.context';
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  const {data ,logoutUser} = useAuth()
  return (
    <>
            <header className="w-full bg-green-500">
                <nav className='w-[96%] md:w-[80%] py-4 mx-auto flex items-center justify-between'>
                    <Link href={'/'}> 
                    CodeAuth
                    </Link>

                    <ul className="flex items-center gap-x-5">
                        <li className="text-base"> 
                            <Link href={'/'} className='text-white hover:text-red-500 transition-all duration-300'>Dashboard</Link>
                        </li>
                     {!data.email ?<>
              <li className="text-base">
                <Link href={'/login'} className='text-white hover:text-red-500 transition-all duration-300'>Login</Link>
              </li>
              <li className="text-base">
                <Link href={'/register'} className='text-white hover:text-red-500 transition-all duration-300'>Register</Link>
              </li>
                     </>:<>
                <li className="text-base">
                  <button onClick={logoutUser} className='text-white hover:text-red-500 transition-all duration-300'>Logout</button>
                </li>
                     
                     </>}
                    </ul>
                </nav>
            </header>
    </>
  )
}

export default Navbar