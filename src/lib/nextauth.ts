import { PrismaAdapter } from "@auth/prisma-adapter"
import { type GetServerSidePropsContext } from "next";
import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
} from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { prisma } from "@/lib/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token }) => {
            const db_user = await prisma.user.findFirst({
                where: {
                    email: token?.email,
                },
            });
            if (db_user) {
                token.id = db_user.id;
                token.role = db_user?.role || 'user';
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token?.picture || session.user.image;
            }
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "Email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials, req) {

                const userCredentials = await prisma.user.findUnique({ where: { email: credentials?.email }});

                if( !userCredentials?.id ) return null;

                const passwordCorrect = await compare(
                    credentials?.password || '',
                    userCredentials?.password!
                );

                const user = {
                    id: userCredentials?.id,
                    name: userCredentials?.name,
                    email: userCredentials?.email,
                    image: userCredentials?.image,
                    role: userCredentials?.role,
                }
                if (passwordCorrect && userCredentials?.id ) {
                    return user;
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
};

export const getAuthSession = () => {
    return getServerSession(authOptions);
};