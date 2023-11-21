"use client"


import { FC } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginButton } from '../login-btn';
import { GoogleIcon } from '../icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const formSchema = z.object({
    email: z.string().email({ message: "Must be a valid email" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
})

interface LoginFormProps extends React.ComponentProps<'div'> { }



const LoginForm: FC<LoginFormProps> = ({ }) => {

    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {

            const response = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (!response?.error) {
                router.push('/');
                router.refresh();
                form.reset();
            }
        } catch (error) {
            alert("Something went wrong")
        }
    }


    return (
        <main className='w-full px-4'>
            <div className='lg:w-1/2 xl:w-1/3 mx-auto border border-gray-600 px-6 py-8 rounded-md'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <h1 className='mx-auto font-semibold text-2xl'>Login</h1>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='w-full' type="submit">Submit</Button>
                    </form>
                </Form>

                <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    or
                </div>
                <LoginButton
                    className='w-full'
                    provider='google'
                    text='Google'
                    Icon={<GoogleIcon height={20} width={20} />}
                />
                <div className="flex flex-row-reverse mt-4">
                    <Link className='text-blue-600 underline' href="/register">Create an account</Link>
                </div>
            </div>
        </main>
    )
}
export default LoginForm;