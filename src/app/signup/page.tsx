"use client"

import React, {useState, useRef} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';
import Alert from '@/components/Alert';
import {Button} from '@/components/Button';
import Link from 'next/link';
import { AppDispatch } from '../store';

import { useDispatch } from 'react-redux'
import { verifyingAsync } from '@/features/auth';

type Field = {
    email: string,
    password: string,
    confirmPassword: string
}

export default function SignUp() {
    const ref = useRef()
    const [verification, setVerification] = useState<Boolean>(false)
    const [field, setField] = useState<Field>({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [alert, setAlert] = useState(false)

    const showAlert = (alert: boolean) => {
        setAlert(alert)
    }

    const handleLoginSignUpButton = async (event) => {
        event.preventDefault()
        if(field.confirmPassword !== field.password) {
            setAlert(true)
        } else {
            try {
                const response = await axios.post("/api/users/signup", {
                    email: field.email,
                    password: field.password,
                })
                if(response.status == 200) {
                    setVerification(true)
                    toast.success('Email verification was sent to your email.')
                }
            } catch (error) {
                toast.error(error.response.data.error)
            }
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
                        {alert ? <Alert showAlert={showAlert} message=' Please make sure your confirm password!'/> : null}
                        <div className="flex items-center justify-center md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <Button className='flex' size='default' variant='secondary' onClick={handleLoginSignUpButton}>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill='none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        {/*  */}
                                    </svg>
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