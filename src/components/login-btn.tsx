"use client"
import { FC } from 'react';
import { signIn, } from "next-auth/react";
import { Button } from "./ui/button";
import { cn } from '@/lib/utils';



type Providers = "credentials" | "google"

interface LoginButtonProps extends React.ComponentProps<'div'>  {
    text: string;
    provider: Providers;
    Icon?: React.ReactNode;
    type?: "sign-in" | "sign-out"
}

export const LoginButton: FC<LoginButtonProps> = ({ text, provider, Icon, className }) => {
    // if (session) {
    //     return (
    //         <Button onClick={() => signOut()}>Sign out</Button>
    //     )
    // }
    
    return (
        <Button  
            className={cn("flex gap-2", className)} 
            onClick={() => signIn(provider)}
        >
            {text}
            {Icon && (Icon)}
        </Button>
    )
}