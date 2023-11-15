import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const {name, phone, email, password} = reqBody

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

        //insert user to database
        const newUser = await prisma.user.create({
            data: {
                name,
                phone,
                email,
                password: hashedPassword
            }
        })
        
        return NextResponse.json({
            message: "User created successfully",
            status: 201,
            newUser
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}