import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Home } from 'lucide-react';
import { ModeToggle } from "@/components/theme-toggle";
import MobileSidebar from "./mobileSidebar";

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})
const NavBar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex gap-1 items-center">
                <MobileSidebar />
                <Link href="/">
                    <h1 className={cn("text-xl md:text-3xl font-bold text-primary", font.className)}>
                        Smart Home
                    </h1>
                </Link>
                <Home width={30} height={30} color="green" />
            </div>
            <ModeToggle />
        </div>
    );
}

export default NavBar;