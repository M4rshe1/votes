import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {AuthOptions} from "next-auth";
import db from "@/lib/db";
import {Role} from "@prisma/client";

export const authOptions: AuthOptions = {
    // pages: {
    //     signIn: '/auth/login',
    // },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
            async profile(profile) {
                const user = await db.user.findUnique({
                    where: {
                        email: profile.email
                    }
                })
                return {
                    ...profile,
                    name: profile.login,
                    image: profile.avatar_url,
                    role: user?.role as Role || Role.USER
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            async profile(profile) {
                const user = await db.user.findUnique({
                    where: {
                        email: profile.email
                    }
                })
                return {
                    ...profile,
                    id: profile.sub,
                    image: profile.picture,
                    role: user?.role as Role || Role.USER
                }
            }
        })
    ],
    callbacks: {
        // @ts-ignore
        async signIn({user, account, profile}) {
            if (['github', "google"].includes(account?.provider as string) && profile?.email) {
                const user = await db.user.upsert({
                    where: {email: profile.email},
                    create: {
                        email: profile.email,
                        // @ts-ignore
                        name: profile.name || profile.login,
                        image: profile.image,
                    },
                    update: {
                        email: profile.email,
                        // @ts-ignore
                        name: profile.name || profile.login,
                        image: profile.image,
                    }
                })
                return true
            }
        },
        session: async ({user, session, token}) => {
            if (user) {
                session.user = user;
            }
            return {
                expires: session.expires,
                user: token
            };
        },
        jwt: async ({token, user}) => {
            const u = user as unknown
            if (u) {
                return {
                    ...token,
                    ...u,
                };
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
}