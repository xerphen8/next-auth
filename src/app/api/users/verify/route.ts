import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        const user = await prisma.user.findUnique({
            where: {
                verifyToken: token,
            }
        })

        if(!user) {
            return NextResponse.json({
                message: "Invalid token",
                status: 400
            })
        }
        
        const updateUser = await prisma.user.update({
            where: {
                verifyToken: token,
            },
            data: {
                emailVerified: true,
                verifyToken: undefined,
                verifyTokenExpired: undefined,
            }
        })
        
        return NextResponse.json({
            message: "Email verified successfully",
            status: 200,
            updateUser
        })
    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}