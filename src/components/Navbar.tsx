"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { BellRing, Menu, Search, Sun, X, Moon, Laptop } from "lucide-react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Sidebar from "./Sidebar"
import Logo from "../../public/images/logo/logo.svg"
import { LANGUAGES, QUICK_ACTIONS, PROFILE_MENU_ITEMS, INITIAL_NOTIFICATIONS, CURRENT_USER } from "@/types/navbar";
import { Notification } from "@/types/navbar";


// کامپوننت فیلد جستجو
// دارای دو حالت: دسکتاپ و موبایل
const SearchField = ({ isMobile = false, onToggle }: { isMobile?: boolean; onToggle?: () => void }) => {
    // نسخه موبایل: فقط آیکون جستجو
    if (isMobile) {
        return (
            <div onClick={onToggle} className="block sm:hidden bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800" role="button" aria-label="باز کردن جستجو">
                <Search size={22} strokeWidth={1.3} />
            </div>
        );
    }

    // نسخه دسکتاپ: فیلد جستجوی کامل
    return (
        <div className="hidden sm:block relative">
            <Input className="w-55 md:w-76 lg:w-88 xl:w-98 rounded-md bg-zinc-100 focus-visible:ring-1 focus-visible:ring-blue-400 placeholder:text-sm pr-8 dark:bg-slate-700 dark:border-slate-600" placeholder="جستجو ..." />
            <Search size={20} strokeWidth={1.5} className="absolute top-2 right-2 text-blue-400" />
        </div>
    );
};


// کامپوننت جستجوی موبایل که روی کل navbar قرار می‌گیرد
// شامل مدیریت کلیک خارج از فیلد جستجو
const MobileSearch = ({ isSearching, setIsSearching }: { isSearching: boolean; setIsSearching: (value: boolean) => void }) => {
    const searchRef = useRef<HTMLDivElement>(null);

    // مدیریت کلیک خارج از فیلد جستجو برای بستن آن
    useEffect(() => {
        if (!isSearching) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearching(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearching, setIsSearching]);

    // اگر جستجو فعال نیست، چیزی نمایش نده
    if (!isSearching) return null;

    return (
        <div ref={searchRef} className="absolute inset-0 mt-4.75 flex items-center px-1">
            <div className="flex items-center w-full relative">
                <Search size={20} strokeWidth={1.5} className="absolute right-3 text-blue-400" />
                <Input autoFocus className="w-full pl-3 pr-10 rounded-md bg-zinc-100 focus-visible:ring-1 focus-visible:ring-blue-400 placeholder:text-sm dark:bg-slate-700 dark:border-slate-600" placeholder="جستجو ..." />
                <button onClick={() => setIsSearching(false)} className="absolute left-3 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer" aria-label="بستن جستجو">
                    <X className="border-2 border-zinc-500 hover:text-zinc-700 rounded-full dark:border-zinc-400 dark:hover:text-zinc-300" size={20} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};


// گروه دکمه‌های اقدام سریع در navbar
// فقط در نسخه دسکتاپ نمایش داده می‌شود
const QuickActionsGroup = () => (
    <div className="lg:flex items-center gap-x-3 hidden">
        {QUICK_ACTIONS.map(action => {
            const IconComponent = action.icon;
            return (
                <Link href={action.href} key={action.id} title={action.title} className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800" aria-label={action.title}>
                    <IconComponent size={22} strokeWidth={1.3} />
                </Link>
            );
        })}
    </div>
);


// کامپوننت تغییر تم (روشن/تاریک/سیستم)
const ThemeToggle = () => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800" role="button" aria-label="تغییر تم">
                    <Sun size={22} strokeWidth={1.3} className="dark:hidden" />
                    <Moon size={22} strokeWidth={1.3} className="hidden dark:block" />
                </button>
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
    );
};


//  کامپوننت انتخاب زبان
const LanguageSelector = ({ language, setLanguage }: { language: "fa" | "en"; setLanguage: (lang: "fa" | "en") => void }) => {
    const currentLanguage = LANGUAGES.find(lang => lang.code === language);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                    <Image className="rounded-full w-5.5 h-5.5" src={currentLanguage?.flag ?? LANGUAGES[0].flag} alt={currentLanguage?.name || "زبان"} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ direction: "rtl" }}>
                {LANGUAGES.map(lang => (
                    <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                        <Image className="rounded-full w-5 h-5 ml-2" src={lang.flag} alt={lang.name} />
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


// کامپوننت نمایش هر اعلان در dropdown
const NotificationItem = ({ notification, onRemove }: { notification: Notification; onRemove: (id: number) => void }) => (
    <div className="flex items-center justify-between gap-x-2 mt-2 border-b last:border-0 border-zinc-200 dark:border-zinc-700 pb-2">
        {/* اطلاعات اعلان */}
        <div className="flex gap-x-2">
            <div className="w-11 h-11 flex-shrink-0 relative">
                <Image className="object-cover rounded-full" src={notification.avatar} width={44} height={44} alt={`آواتار ${notification.name}`} />
                <span className="absolute right-1 bottom-1 translate-x-1/4 translate-y-1/4 bg-green-600 w-2 h-2 rounded-full border-2 border-white dark:border-slate-800" />
            </div>
            <div className="flex flex-col space-y-2">
                <p className="text-[13px] text-gray-800 dark:text-gray-200">{notification.text}</p>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{notification.time}</span>
            </div>
        </div>

        {/* دکمه حذف اعلان */}
        <button onClick={() => onRemove(notification.id)} className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-700 dark:hover:bg-slate-800 transition-colors">
            <X size={14} strokeWidth={2} className="text-zinc-600 dark:text-zinc-300" />
        </button>
    </div>
);


//  کامپوننت dropdown اعلانات
const NotificationsDropdown = ({ notifications, onRemoveNotification }: { notifications: Notification[]; onRemoveNotification: (id: number) => void }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                <div className="relative">
                    <BellRing size={22} strokeWidth={1.3} />
                    {/* نشان وجود اعلان جدید */}
                    {notifications.length > 0 && (
                        <>
                            <span className="absolute -left-0.75 -top-1.25 bg-green-600 w-1.25 h-1.25 rounded-full" />
                            <span className="absolute -left-1 -top-1.75 bg-green-600 w-1.75 h-1.75 rounded-full animate-ping" />
                        </>
                    )}
                </div>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" style={{ direction: "rtl" }} className="w-84 p-3">
            <div className="flex flex-col gap-y-2">
                {notifications.length > 0 ? (
                    <>
                        {/* هدر اعلانات */}
                        <div className="flex items-center justify-between px-2 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                            <h4 className="text-md font-normal dark:text-gray-400">اعلانات</h4>
                            <span className="text-[12px] font-normal bg-indigo-400 dark:bg-indigo-600 p-1 rounded-md text-white">
                                {notifications.length} جدید
                            </span>
                        </div>

                        {/* لیست اعلانات */}
                        <div className="flex flex-col gap-y-2">
                            {notifications.map(notification => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRemove={onRemoveNotification}
                                />
                            ))}

                            {/* دکمه مشاهده همه اعلانات */}
                            <Link href="/notifications">
                                <span className="text-[14px] text-white dark:bg-blue-600 bg-blue-500 rounded-md mt-2 p-2 block text-center hover:bg-blue-700 transition-colors">
                                    مشاهده همه اعلانات
                                </span>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        {/* حالت عدم وجود اعلان */}
                        <div className="px-2 border-b border-zinc-200 dark:border-zinc-700 pb-2">
                            <h4 className="text-md font-normal dark:text-gray-400">اعلانات</h4>
                        </div>
                        <div className="flex flex-col items-center justify-center text-blue-600 pt-6 pb-2">
                            <svg className="text-blue-600 dark:text-blue-700 dark:ring-blue-800/50 ring-2 ring-blue-700/50 rounded-full" width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z" fill="currentColor" />
                                <path d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z" fill="currentColor" />
                                <path d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" fill="currentColor" />
                            </svg>
                            <p className="mt-4 dark:text-gray-400 text-black">اطلاعاتی موجود نیست</p>
                        </div>
                    </>
                )}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
);


// کامپوننت dropdown پروفایل کاربر
const ProfileDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="transition-all cursor-pointer">
                <Image className="rounded-full w-9.5 h-9.5 grayscale-50 hover:grayscale-0 transition-all duration-200" src={CURRENT_USER.avatar} width={36} height={36} alt="profile" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-2 shadow-lg rounded-lg" style={{ direction: "rtl" }}>
            {/* اطلاعات کاربر */}
            <DropdownMenuItem className="px-2 py-1 focus:bg-transparent cursor-default">
                <div className="flex items-center gap-3">
                    <Image src={CURRENT_USER.avatar} className="rounded-lg w-10 h-10 object-cover" width={40} height={40} alt="profile" />
                    <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-gray-800 dark:text-gray-200">
                            {CURRENT_USER.name}
                        </span>
                        <span className="text-[12.5px] text-zinc-500 dark:text-zinc-400">
                            {CURRENT_USER.email}
                        </span>
                    </div>
                </div>
            </DropdownMenuItem>

            {/* آیتم‌های منو */}
            <div className="space-y-2 mt-4">
                {PROFILE_MENU_ITEMS.map((item, index) => {
                    const IconComponent = item.icon;
                    const textColor = item.isDanger ? "text-red-400 dark:text-red-400" : "text-gray-700 dark:text-gray-400";
                    const iconColor = item.isDanger ? "text-red-500 dark:text-red-400" : "";
                    // خط جداکننده قبل از آیتم خروج
                    const isLastItem = index === PROFILE_MENU_ITEMS.length - 1;

                    return (
                        <DropdownMenuItem key={item.id} asChild className={isLastItem ? "border-t border-zinc-200 dark:border-zinc-700 pt-2" : ""}>
                            <Link href={item.href} className="w-full flex items-center cursor-pointer gap-2 px-2 py-2">
                                <IconComponent className={`mr-2 h-4 w-4 ${iconColor}`} />
                                <span className={`text-[13px] ${textColor}`}>{item.title}</span>
                            </Link>
                        </DropdownMenuItem>
                    );
                })}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
);


// کامپوننت لوگو که در navbar نمایش داده می‌شود
// بسته به وضعیت sidebar نمایش داده می‌شود یا خیر
const NavbarLogo = ({ isDesktopSidebarOpen }: { isDesktopSidebarOpen: boolean }) => (
    <div className={`${isDesktopSidebarOpen ? 'lg:hidden' : 'flex items-center'}`}>
        <Link href="/" className="flex items-center gap-x-2">
            <Image className="w-8 h-8 md:w-9 md:h-9" src={Logo} alt="لوگو توسکا" />
            <h1 className="hidden sm:block sm:text-xl md:text-2xl dark:text-white font-medium">
                توسکا
            </h1>
        </Link>
    </div>
);


// کامپوننت دکمه sidebar موبایل

const MobileSidebarButton = ({ setIsMobileSidebarOpen, isMobileSidebarOpen }: { setIsMobileSidebarOpen: (open: boolean) => void; isMobileSidebarOpen: boolean; }) => (
    <div className="lg:hidden">
        <Sidebar
            setIsOpen={setIsMobileSidebarOpen}
            isOpen={isMobileSidebarOpen}
            isDesktop={false}
            isDesktopOpen={false}
            setIsDesktopOpen={() => { }}
        />
    </div>
);


//  کامپوننت دکمه sidebar دسکتاپ
//  فقط زمانی نمایش داده می‌شود که sidebar بسته باشد
const DesktopSidebarButton = ({ isDesktopSidebarOpen, setIsDesktopSidebarOpen }: { isDesktopSidebarOpen: boolean; setIsDesktopSidebarOpen: (open: boolean) => void; }) => (
    <div className="hidden lg:block">
        {!isDesktopSidebarOpen && (
            <button onClick={() => setIsDesktopSidebarOpen(true)} className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800" aria-label="باز کردن منو">
                <Menu size={22} strokeWidth={1.3} />
            </button>
        )}
    </div>
);


// Hook سفارشی برای مدیریت localStorage
// شامل error handling و SSR safety
const useLocalStorage = <T,>(key: string, initialValue: T) => {

    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`خطا در خواندن ${key} از localStorage:`, error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`خطا در ذخیره ${key} در localStorage:`, error);
        }
    };

    return [storedValue, setValue] as const;
};


//  کامپوننت اصلی Navbar
//  شامل مدیریت state، جستجو، اعلانات و sidebar
export default function Navbar() {
    // State های مختلف navbar
    const [isSearching, setIsSearching] = useState(false);
    const [language, setLanguage] = useLocalStorage<"fa" | "en">("language", "fa");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);


    //  تابع حذف اعلان خاص
    const handleRemoveNotification = (id: number) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };


    return (
        <>
            {/* Navigation Bar اصلی */}
            <nav className={`w-full sticky inset-x-0 top-0 py-2 h-14 bg-white z-50 shadow-sm dark:bg-slate-900 transition-all duration-300 ${isDesktopSidebarOpen ? 'lg:pr-62 xl:pr-66' : ''}`}>
                <MaxWidthWrapper>
                    <div className="flex justify-between items-center relative">
                        {/* بخش چپ - لوگو و منو */}
                        {!isSearching && (
                            <div className="flex items-center gap-x-3">
                                <NavbarLogo isDesktopSidebarOpen={isDesktopSidebarOpen} />

                                <MobileSidebarButton
                                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                                    isMobileSidebarOpen={isMobileSidebarOpen}
                                />

                                <DesktopSidebarButton
                                    isDesktopSidebarOpen={isDesktopSidebarOpen}
                                    setIsDesktopSidebarOpen={setIsDesktopSidebarOpen}
                                />

                                <QuickActionsGroup />
                                <SearchField />
                            </div>
                        )}

                        {/* Overlay جستجوی موبایل */}
                        <MobileSearch isSearching={isSearching} setIsSearching={setIsSearching} />

                        {/* بخش راست - اکشن‌ها */}
                        {!isSearching && (
                            <div className="flex items-center gap-x-3">
                                <SearchField isMobile onToggle={() => setIsSearching(true)} />
                                <ThemeToggle />
                                <LanguageSelector language={language} setLanguage={setLanguage} />
                                <NotificationsDropdown
                                    notifications={notifications}
                                    onRemoveNotification={handleRemoveNotification}
                                />
                                <ProfileDropdown />
                            </div>
                        )}
                    </div>
                </MaxWidthWrapper>
            </nav>

            {/* Sidebar دسکتاپ */}
            <div className="hidden lg:block">
                <Sidebar
                    setIsOpen={() => { }}
                    isOpen={true}
                    isDesktop={true}
                    isDesktopOpen={isDesktopSidebarOpen}
                    setIsDesktopOpen={setIsDesktopSidebarOpen}
                />
            </div>
        </>
    );
}