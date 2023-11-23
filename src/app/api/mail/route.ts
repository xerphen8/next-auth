import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(request: NextRequest) {
    const subject = 'Verification NextJS'
    const content = "We're happy you signed up for My Apps. To Start exploring the My Apps and neighbourhood, please confirm your email addresss"
    try {
        const reqBody = await request.json()
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

        return NextResponse.json({
            message: "Welcome to My Apps!",
            status: 200,
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}