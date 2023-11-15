import CredentialsProvider from 'next-auth/providers/credentials'
import {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import NextAuth from 'next-auth/next'
import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'example@example.com'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    return null;
                }

                const userExisted = await prisma.user.findUnique({ 
                    where: {
                        email: credentials.email
                    }
                })
                
                //check if user doesn't exist
                if(!userExisted){
                    return null;
                }

                //check if passsword is valid
                const validPassword = await bcryptjs.compare(credentials.password, userExisted.password)
                if(!validPassword) {
                    return null;
                }
                
                return {
                    id: userExisted.id,
                    name: userExisted.name,
                    email: userExisted.email,
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({token, user, session, trigger}) {
            if(trigger === 'update' && session?.name) {
                token.name = session.name;
            }

            if(user){
                const userExist = await prisma.user.findUnique({
                    where: {
                        email: user.email
                    }
                })

                if(userExist) {
                    return {
                        ...token,
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        phone: 0,
                        password: '',
                        image: ''
                    }
                }

                const newUser = await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        phone: 0,
                        password: '',
                        image: ''
                    }
                })

                return {
                    ...token, newUser
                }
            }
            return token
        },
        async session({session, token, user}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt' as const,
    },
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}