
import Link from 'next/link';
import { getAuthSession } from '@/lib/nextauth';
import UserAccountNav from './user-account-nav';
import ThemeToggle from './theme-toggle';



const Navbar = async () => {
    const session = await getAuthSession();
    return (
        <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-4 ">
            <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
                {/* Logo */}
                <Link href={"/"} className="flex items-center gap-2">
                    <p className="rounded-lg border-2 border-black px-2 py-1 text-xl font-bold md:block dark:border-white">
                        Navbar
                    </p>
                </Link>
                <div className="flex items-center">
                    <ThemeToggle className="mr-4" />
                    {session?.user ? (
                        <UserAccountNav user={session.user} />
                    ) : (
                        <Link href="/login" className='px-6 py-2 rounded bg-gray-950 dark:bg-white text-white dark:text-gray-950'>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Navbar;