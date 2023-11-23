import prisma from '@/libs/prisma'
import {SendEmail} from "@/libs/nodemailer";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const {email, password} = reqBody

        //check if user already exists
        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(userExist){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // password hashing
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await prisma.user.create({
            data: {
                name: '',
                phone: 0,
                email,
                password: hashedPassword,
                emailVerified: false,
                image: '',
            },
        })

        await SendEmail({email, userId: newUser.id})

        return NextResponse.json({
            message: "User created successfully",
            status: 200,
            newUser
        })

        // //insert user to database
        // const newUser = await prisma.user.create({
        //     data: {
        //         email,
        //         password: hashedPassword
        //     }
        // })

        // return NextResponse.json({
        //     message: "User created successfully",
        //     status: 201,
        //     newUser
        // })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}