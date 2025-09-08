"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Logo from "../../public/images/logo/logo.svg"
import { BellRing, Menu, Search, Sun, X, Moon, Laptop } from "lucide-react"
import Link from "next/link"
import IR from "../../public/images/IR.svg"
import UserProfile from "../../public/images/user-profile.jpeg"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

export default function Navbar() {
    const [isSearching, setIsSearching] = useState(false)
    const serchRef = useRef<HTMLDivElement>(null)
    const { setTheme } = useTheme()

    useEffect(() => {
        if (!isSearching) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (serchRef.current && !serchRef.current.contains(e.target as Node)) {
                setIsSearching(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isSearching])

    return (
        <nav className="w-full sticky inset-x-0 top-0 pt-3 h-14 bg-white z-50 shadow-sm dark:bg-slate-900">
            <MaxWidthWrapper>
                <div className="flex justify-between items-center relative">
                    {!isSearching && (
                        <div className="flex items-center gap-x-4">
                            <Link href="/">
                                <Image className="w-7 h-7" src={Logo} alt="logo" />
                            </Link>
                            <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                <Menu size={22} strokeWidth={1.3} />
                            </div>
                        </div>
                    )}

                    {isSearching ? (
                        <div ref={serchRef} className="absolute inset-0 mt-4.75 flex items-center px-1">
                            <div className="flex items-center w-full relative">
                                <Search size={20} strokeWidth={1.5} className="absolute right-3 text-blue-400" />
                                <Input autoFocus className="w-full pl-3 pr-10 rounded-md bg-zinc-100 focus-visible:ring-1 focus-visible:ring-blue-400 placeholder:text-sm" placeholder="جستجو ..." />
                                <button onClick={() => setIsSearching(false)} className="absolute left-3 text-zinc-500 hover:text-zinc-700 transition-colors cursor-pointer">
                                    <X className="border-2 border-zinc-500 hover:text-zinc-700 rounded-full" size={20} strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-3">
                            <div onClick={() => setIsSearching(true)} className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                <Search size={22} strokeWidth={1.3} />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                        <Sun size={22} strokeWidth={1.5} className="dark:hidden" />
                                        <Moon size={22} strokeWidth={1.5} className="hidden dark:block" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" style={{ direction: "rtl" }}>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        <Sun className="mr-2 h-4 w-4" /> روشن
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        <Moon className="mr-2 h-4 w-4" /> تاریک
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        <Laptop className="mr-2 h-4 w-4" /> سیستم
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                <Image className="rounded-full w-5 h-5" src={IR} alt="iran" />
                            </div>
                            <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                <BellRing size={22} strokeWidth={1.5} />
                            </div>
                            <div className="transition-all cursor-pointer ">
                                <Image src={UserProfile} className="rounded-full w-9 grayscale-50 hover:grayscale-0 h-auto" alt="profile" />
                            </div>
                        </div>
                    )}
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
