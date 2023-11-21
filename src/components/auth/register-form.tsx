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
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Must be a valid email" }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    passwordConfirm: z.string(),
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});

interface RegisterFormProps extends React.ComponentProps<'div'> { }



const RegisterForm: FC<RegisterFormProps> = ({ }) => {

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

            const response = await fetch(`/api/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    name: values.name,
                }),
            });


            if (response.ok) {
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm your password" {...field} />
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
                    text='Register with Google'
                    Icon={<GoogleIcon height={20} width={20} />}
                />
                <div className="flex flex-row-reverse mt-4">
                    <Link className='text-blue-600 underline' href="/login">Go to your accout</Link>
                </div>
            </div>
        </main>
    )
}
export default RegisterForm;