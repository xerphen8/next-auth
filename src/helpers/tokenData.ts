import {NextRequest} from 'next/server'
import jwt, {Secret} from 'jsonwebtoken'

export const SECRET_KEY: Secret = process.env.NEXTAUTH_SECRET

interface JwtPayload {
    email: string
}

export const getTokenData = (request: NextRequest) => {
    try {
        const token = request.cookies.get('next-auth.session-token')?.value || '';
        const decoded = jwt.verify(token, SECRET_KEY!) as JwtPayload
        return decoded.email
    } catch (error) {
        throw new Error(error.message)
    }
}