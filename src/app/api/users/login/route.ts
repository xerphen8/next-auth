import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const {email, password} = reqBody

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        //check if user already exists
        if(!user){
            return NextResponse.json({error: "User does not exist", status: 400})
        }

        //check if passsword is valid
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Please check your email/password!", status: 400})
        }

        //create token data
        const tokenData = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
        }

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        
        const response = NextResponse.json({
            message: "Login Successful!",
            success: true
        })
        response.cookies.set('next-auth.session-token', token, {
            httpOnly: true
        })
        
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}