"use client"

import React, {useState} from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import {Button} from '@/components/Button';
import Link from 'next/link';

type Field = {
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp() {
    const [verification, setVerification] = useState<Boolean>(false)
    const [field, setField] = useState<Field>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const SignUpFunction = async () => {
        try {
            const response = await axios.post("/api/auth/signup", {
                email: field.email,
                password: field.password,
            })
            if(response.status == 200) {
                setVerification(true)
            }
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleSignUpButton = async (event) => {
        event.preventDefault()

        if(field.confirmPassword !== field.password) {
            toast.error('Please make sure your confirmed password is a match.')
            return true;
        } else {
            const SignUp = SignUpFunction()
            toast.promise(SignUp, {
                loading: <b>Wait a second...</b>,
                success: <b>Email verification was sent to your email.</b>,
                error: <b>Sign up failed</b>
            })
        }
    }

    return(
        <main className="flex min-h-screen flex-col items-center justify-center p-10">
            <div className="w-full max-w-sm">
            {
                !verification ? 
                    <form className="bg-white shadow-2xl px-8 pt-6 pb-8 mb-4 rounded-2xl">
                        <div className="mb-6">
                            <label className="block text-black text-2xl font-bold mb-3">
                                Sign Up
                            </label>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                                    Email
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                                    type="email"
                                    placeholder='example@example.com'
                                    value={field.email}
                                    onChange={(e) => setField({...field, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                    Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" 
                                    type="password"
                                    value={field.password}
                                    onChange={(e) => setField({...field, password: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-confirm-password">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="shadow border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" 
                                    type="password"
                                    value={field.confirmPassword}
                                    onChange={(e) => setField({...field, confirmPassword: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <Button className='flex' size='default' variant='secondary' onClick={handleSignUpButton}>
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </form>
                :
                <div className="bg-white shadow-2xl px-8 pt-6 pb-8 mb-4 rounded-2xl">
                    <div className="mb-6">
                        <label className="block text-black text-2xl font-bold mb-3">
                            Verification
                        </label>
                    </div>
                    <div className="w-full mb-6">
                        <p className="block text-black text-lg mb-3">
                            We have already sent email verification to your email. Please check your email.
                        </p>
                    </div>
                    <div className='w-full'>
                        <Button size='long' variant='secondary'>
                            <Link href='https://mail.google.com/mail/u/0/#inbox' target='_blank'>
                                Go to your email
                            </Link>
                        </Button>
                    </div>
                </div>
            }
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </main>
    )
}