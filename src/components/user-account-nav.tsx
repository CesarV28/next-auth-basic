"use client";

import { FC } from 'react';
import Link from "next/link";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import { LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from './user-avatar';
import { useRouter } from 'next/navigation';

interface UserAccountNavProps {
    user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {

    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    className="w-10 h-10"
                    user={{
                        name: user.name || null,
                        image: user.image || null,
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent  align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-2  leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/">Home</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();
                        signOut().catch(console.error);
                        router.push("/")
                    }}
                    className="text-red-600 cursor-pointer"
                >
                    Sign out
                    <LogOut className="w-4 h-4 ml-2 " />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountNav;