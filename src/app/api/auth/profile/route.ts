import { getTokenData } from '@/helpers/tokenData'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(request: NextRequest) {
    try {
        const token = getTokenData(request)
        const userAuth = await prisma.user.findUnique({
            where: {
                email: token
            },
            select: {
                name: true,
                email: true,
                phone: true
            }
        })
        
        return NextResponse.json({
            message: "User found",
            data: userAuth
        })
    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }
}