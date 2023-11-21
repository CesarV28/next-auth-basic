import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/db';


export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();
        // TODO: validate email and password

        const alreadyExist = await prisma.user.findUnique({ where: { email }});

        if( alreadyExist?.email ) {
            return NextResponse.json({
                data: {},
                message: "Error creating user. The user is already taken."
            }, {
                status: 400
            });
        }

        const hashedPassword = await hash(password, 10);

        const userData =  {
            email,
            password: hashedPassword,
            name
        }

        const newUser = await prisma.user.create({ data: userData });
        // const newUser = await prisma.user.findMany()

        return NextResponse.json({
            data: newUser,
            message: "Created"
        }, {
            status: 201
        });
    } catch (e) {
        console.log({ e });
        return NextResponse.json({
            data: [],
            message: "fail"
        }, {
            status: 500
        });
    }
}