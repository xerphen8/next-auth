import { getTokenData } from '@/helpers/tokenData'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModels'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const tokenEmail = getTokenData(request)
        const userAuth = await prisma.user.findUnique({
            where: {
                email: tokenEmail
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