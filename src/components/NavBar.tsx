import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useSession, signOut } from 'next-auth/react'

export const NavBar = () => {
    const {data: session, status, update} = useSession()
    const router = useRouter()

    const logoutButton = async () => {
        toast.success('You have been logged out')
        setTimeout(() => {
          signOut()
        }, 1000)
    }
    

    return (
        <>
            <div className='float-right p-5 space-x-2'>
            <label className='text-white'>{session?.user.name}</label>
            {
            status === 'authenticated' ?
                <Button name='Logout' width={null} bgColor='red' func={logoutButton}/>
            :
                <Button name='Login' width={null} bgColor='red' func={() => router.push('/login')}/>
            }
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    )
}
