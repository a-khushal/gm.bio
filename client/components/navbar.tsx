"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function Navbar({ className }: { className?: string }) {
    const router = useRouter();

    return (
        <nav
            className={cn(
                "flex items-center justify-between p-6 md:p-8 hover:cursor-pointer",
                className
            )}
            onClick={() => router.push("/")}
        >
            <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-ping"></div>
                    <div className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-sm"></div>
                    <div className="relative w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"></div>
                </div>
                <span className="text-xl font-bold font-mono">gm.bio</span>
            </div>
        </nav>
    );
}
