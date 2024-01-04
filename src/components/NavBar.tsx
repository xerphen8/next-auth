"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import {Button} from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'
import { useSession, signOut } from 'next-auth/react'
import { SearchBar } from './SearchBar'
import { WishBar } from './WishBar'
import { NotificationBar } from './NotificationBar'

const logoutButton = async () => {
    toast.success('You have been logged out')
    setTimeout(() => {
      signOut()
    }, 1000)
}

export const NavBar = () => {
    const {data: session, status, update} = useSession()
    const router = useRouter()

    const AccountBar = status === 'authenticated' ?
        <>
            <li>
                <WishBar />
            </li>
            <li>
                <NotificationBar />
            </li>
            <li>
                <Button size='default' variant='destructive' onClick={logoutButton}>
                    <span>Logout</span>
                </Button>
            </li>
        </>
        : 
        <Button size='default' variant='default' onClick={() => router.push('/login')}>
            <span>Login</span>
        </Button>

    return (
        <>
        <div className='w-full p-5 items-center space-x-2 grid grid-cols-3 pt-5'>
            <div className='text-left list-none text-white'>
                <SearchBar />
            </div>
            <div className='text-right col-span-2 flex items-center list-none justify-end space-x-5'>
                { AccountBar }
            </div>            
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        </>
    )
}
