"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Logo from "../../public/images/logo/logo.svg"
import { BellRing, Menu, Search, Sun, X, Moon, Laptop, User, Mail, LockKeyhole, LogOut } from "lucide-react"
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
    const searchRef = useRef<HTMLDivElement>(null)
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

    // بستن جستجو وقتی کلیک بیرون از آن انجام می‌شود
    useEffect(() => {
        if (!isSearching) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
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
        <nav className="w-full sticky inset-x-0 top-0 py-2 h-14 bg-white z-50 shadow-sm dark:bg-slate-900">
            <MaxWidthWrapper>
                <div className="flex justify-between items-center relative">
                    {/* ---------- چپ: لوگو و منو ---------- */}
                    {!isSearching && (
                        <div className="flex items-center gap-x-4 sm:gap-x-2">
                            <Link href="/" className="sm:order-1 sm:flex items-center gap-x-2 sm:mr-3">
                                <Image className="w-8 h-8 md:w-9 md:h-9" src={Logo} alt="logo" />
                                <h1 className="hidden sm:block sm:text-xl md:text-2xl sm:order-2">توسکا</h1>
                            </Link>
                            <div className="bg-zinc-100 rounded-full p-1.75 sm:order-0 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                <Menu size={24} strokeWidth={1.3} />
                            </div>
                            <div className="hidden sm:block relative md:mr-3 sm:order-3">
                                <Input className="w-64 md:w-86 lg:w-98 rounded-md bg-zinc-100 focus-visible:ring-1 focus-visible:ring-blue-400 placeholder:text-sm pr-8" placeholder="جستجو ..." />
                                <Search size={20} strokeWidth={1.5} className="absolute top-2 right-2 text-blue-400" />
                            </div>
                        </div>
                    )}

                    {/* ---------- وسط/راست: آیکون‌ها و حالت سرچ ---------- */}
                    {isSearching ? (
                        <div ref={searchRef} className="absolute inset-0 mt-4.75 flex items-center px-1">
                            <div className="flex items-center w-full relative">
                                <Search size={20} strokeWidth={1.5} className="absolute right-3 text-blue-400" />
                                <Input autoFocus className="w-full pl-3 pr-10 rounded-md bg-zinc-100 focus-visible:ring-1 focus-visible:ring-blue-400 placeholder:text-sm" placeholder="جستجو ..." />
                                <button onClick={() => setIsSearching(false)} className="absolute left-3 text-zinc-500 hover:text-zinc-700 transition-colors cursor-pointer">
                                    <X className="border-2 border-zinc-500 hover:text-zinc-700 rounded-full" size={20} strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-3 md:gap-x-5">
                            <div onClick={() => setIsSearching(true)} className="block sm:hidden bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                <Search size={24} strokeWidth={1.3} />
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                        <Sun size={24} strokeWidth={1.5} className="dark:hidden" />
                                        <Moon size={24} strokeWidth={1.5} className="hidden dark:block" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" style={{ direction: "rtl" }}>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        <Sun className="mr-2 h-4 w-4" />
                                        <span className="text-[14px]">روشن</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        <Moon className="mr-2 h-4 w-4" />
                                        <span className="text-[14px]">تاریک</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        <Laptop className="mr-2 h-4 w-4" />
                                        <span className="text-[14px]">سیستم</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                                        <Image className="rounded-full w-5.5 h-5.5" src={language === "fa" ? IR : EN} alt={language === "fa" ? "persian" : "english"} />
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
                                            <BellRing size={24} strokeWidth={1.5} />
                                            <span className="absolute -left-1 -top-1.5 bg-green-600 w-1.25 h-1.25 rounded-full"></span>
                                            <span className="absolute -left-1.25 -top-1.75 bg-green-600 w-1.75 h-1.75 rounded-full animate-ping"></span>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" style={{ direction: "rtl" }} className="w-84 p-3">
                                    <div className="flex flex-col gap-y-2">
                                        {notifications.length > 0 ? (
                                            <>
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
                                                                    <span className="text-[10px] dark:text-gray-400">{n.time}</span>
                                                                </div>
                                                            </div>

                                                            {/* دکمه حذف */}
                                                            <button onClick={() => handleRemoveNotification(n.id)} className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-700 dark:hover:bg-slate-800 transition-colors">
                                                                <X size={14} strokeWidth={2} className="text-zinc-600 dark:text-zinc-300" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <Link href="/">
                                                        <span className="text-[14px] text-white dark:bg-blue-600 bg-blue-500 rounded-md mt-2 p-2 block text-center hover:bg-blue-700 transition-colors">خواندن همه اعلان‌ها</span>
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="px-2 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                                                    <h4 className="text-md font-normal dark:text-gray-400">اعلان</h4>
                                                </div>

                                                <div className="flex flex-col items-center justify-center text-blue-600 pt-6 pb-2">
                                                    <svg className="text-blue-600 dark:text-blue-700 dark:ring-blue-800/50 ring-2 ring-blue-700/50 rounded-full" width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.5" d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z" fill="currentColor"></path>
                                                        <path d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="currentColor"></path>
                                                        <path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor"></path>
                                                    </svg>
                                                    <p className="mt-4 dark:text-gray-400 text-black">اطلاعاتی موجود نیست</p>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="transition-all cursor-pointer">
                                        <Image src={UserProfile} className="rounded-full w-10 h-10 grayscale-50 hover:grayscale-0" alt="profile" width={36} height={36} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56 p-2 shadow-lg rounded-lgl" style={{ direction: "rtl" }}>
                                    <DropdownMenuItem className="px-2 py-1 focus:bg-transparent cursor-default">
                                        <div className="flex items-center gap-3">
                                            <Image src={UserProfile} className="rounded-lg w-10 h-10 object-cover" width={40} height={40} alt="profile" />
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-medium">محمد متین علی اکبری</span>
                                                <span className="text-[12px] text-zinc-500">example@gmail.com</span>
                                            </div>
                                        </div>
                                    </DropdownMenuItem>

                                    <div className="space-y-2 mt-4">
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="w-full flex items-center cursor-pointer gap-2 px-2 py-2">
                                                <User className="mr-2 h-4 w-4" />
                                                <span className="text-[13px] text-gray-700 dark:text-gray-400">پروفایل</span>
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href="/mailbox" className="w-full flex items-center cursor-pointer gap-2 px-2 py-2">
                                                <Mail className="mr-2 h-4 w-4" />
                                                <span className="text-[13px] text-gray-700 dark:text-gray-400">صندوق ورودی</span>
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href="/lockscreen" className="w-full flex items-center cursor-pointer gap-2 px-2 py-2">
                                                <LockKeyhole className="mr-2 h-4 w-4" />
                                                <span className="text-[13px] text-gray-700 dark:text-gray-400">قفل صفحه</span>
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild className="border-t border-zinc-200 cursor-pointer dark:border-zinc-700 pt-2">
                                            <Link href="/logout" className="w-full flex items-center gap-2 px-2 ">
                                                <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />
                                                <span className="text-[13px] text-red-400 dark:text-red-400">خروج</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
