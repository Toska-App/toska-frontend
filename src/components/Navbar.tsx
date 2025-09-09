"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Logo from "../../public/images/logo/logo.svg"
import { BellRing, Menu, Search, Sun, X, Moon, Laptop } from "lucide-react"
import Link from "next/link"
import IR from "../../public/images/IR.svg"
import EN from "../../public/images/EN.svg"
import UserProfile from "../../public/images/user-profile.jpeg"
import Profile2 from "../../public/images/profile-16.jpeg"
import Profile3 from "../../public/images/profile-34.jpeg"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"


export default function Navbar() {
    const [isSearching, setIsSearching] = useState(false)
    const serchRef = useRef<HTMLDivElement>(null)
    const { setTheme } = useTheme()
    const [language, setLanguage] = useState<"fa" | "en">("fa")

    // اعلان‌ها رو در state نگه می‌داریم
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            name: "محمد کلانتر",
            text: "محمد کلانتر شما را به گروه دعوت کرد",
            time: "45 دقیقه قبل",
            avatar: UserProfile,
        },
        {
            id: 2,
            name: "مونا سعادت جو",
            text: "مونا سعادت جو فایل جدید آپلود کرد",
            time: "2 ساعت قبل",
            avatar: Profile2,
        },
        {
            id: 3,
            name: "سامان سعیدی",
            text: "سامان سعیدی شما را در پست رابط کاربری منشن کرد",
            time: "9 ساعت قبل",
            avatar: Profile3,
        },
    ])


    // تابع حذف اعلان
    const handleRemoveNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }

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


    useEffect(() => {
        const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") : null
        if (savedLanguage === "fa" || savedLanguage === "en") {
            setLanguage(savedLanguage)
        }
    }, [])


    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("language", language)
        }
    }, [language])


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

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                        <Image className="rounded-full w-5 h-5" src={language === "fa" ? IR : EN} alt={language === "fa" ? "persian" : "english"} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent style={{ direction: "rtl" }}>
                                    <DropdownMenuItem onClick={() => setLanguage("fa")}>
                                        <Image className="rounded-full w-5 h-5" src={IR} alt="persian" /> فارسی
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setLanguage("en")}>
                                        <Image className="rounded-full w-5 h-5" src={EN} alt="english" /> انگلیسی
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                        <div className="relative">
                                            <BellRing size={22} strokeWidth={1.5} />
                                            <span className="absolute -left-1 -top-1.5 bg-green-600 w-1.25 h-1.25 rounded-full"></span>
                                            <span className="absolute -left-1.25 -top-1.75 bg-green-600 w-1.75 h-1.75 rounded-full animate-ping"></span>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" style={{ direction: "rtl" }} className="w-84 p-3">
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center justify-between px-2 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                                            <h4 className="text-md font-normal dark:text-gray-400">اعلان</h4>
                                            <span className="text-[12px] font-normal bg-indigo-400 dark:bg-indigo-600 p-1 rounded-md text-white">
                                                {notifications.length} جدید
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-y-2">
                                            {notifications.map((n) => (
                                                <div key={n.id} className="flex items-center justify-between gap-x-2 mt-2 border-b last:border-0 border-zinc-200 dark:border-zinc-700 pb-2">
                                                    {/* بخش پروفایل و متن */}
                                                    <div className="flex gap-x-2">
                                                        <div className="w-11 h-11 flex-shrink-0 relative">
                                                            <Image
                                                                src={n.avatar}
                                                                width={44}
                                                                height={44}
                                                                alt={`${n.name} avatar`}
                                                                className="object-cover rounded-full"
                                                            />
                                                            <span className="absolute right-1 bottom-1 translate-x-1/4 translate-y-1/4 bg-green-600 w-2 h-2 rounded-full border-2 border-white dark:border-slate-800"></span>
                                                        </div>

                                                        <div className="flex flex-col space-y-2">
                                                            <p className="text-[13px]">{n.text}</p>
                                                            <span className="text-[10px] dark:text-gray-500">{n.time}</span>
                                                        </div>
                                                    </div>

                                                    {/* دکمه حذف */}
                                                    <button onClick={() => handleRemoveNotification(n.id)} className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-700 dark:hover:bg-slate-800 transition-colors">
                                                        <X size={14} strokeWidth={2} className="text-zinc-600 dark:text-zinc-300" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>


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
