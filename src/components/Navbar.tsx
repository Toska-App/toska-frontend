"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
    BellRing,
    Menu,
    Search,
    Sun,
    X,
    Moon,
    Laptop,
    User,
    Mail,
    LockKeyhole,
    LogOut,
    Calendar,
    ClipboardPen,
    MessageCircleMore
} from "lucide-react"

import MaxWidthWrapper from "./MaxWidthWrapper"
import Logo from "../../public/images/logo/logo.svg"
import IR from "../../public/images/IR.svg"
import EN from "../../public/images/EN.svg"
import UserProfile from "../../public/images/user-profile.jpeg"
import Profile2 from "../../public/images/profile-16.jpeg"
import Profile3 from "../../public/images/profile-34.jpeg"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Sidebar from "./Sidebar"

// Types
interface Notification {
    id: number;
    name: string;
    text: string;
    time: string;
    avatar: any;
}

interface Language {
    code: "fa" | "en";
    name: string;
    flag: any;
}

interface QuickAction {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    href: string;
}

interface ProfileMenuItem {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    href: string;
    isDanger?: boolean;
}

// Data
const LANGUAGES: Language[] = [
    { code: "fa", name: "فارسی", flag: IR },
    { code: "en", name: "انگلیسی", flag: EN }
];

const QUICK_ACTIONS: QuickAction[] = [
    { id: "calendar", title: "تقویم", icon: Calendar, href: "/calendar" },
    { id: "todolist", title: "لیست کار", icon: ClipboardPen, href: "/todolist" },
    { id: "chat", title: "چت", icon: MessageCircleMore, href: "/chat" }
];

const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
    { id: "profile", title: "پروفایل", icon: User, href: "/profile" },
    { id: "mailbox", title: "صندوق ورودی", icon: Mail, href: "/mailbox" },
    { id: "lockscreen", title: "قفل صفحه", icon: LockKeyhole, href: "/lockscreen" },
    { id: "logout", title: "خروج", icon: LogOut, href: "/logout", isDanger: true }
];

const INITIAL_NOTIFICATIONS: Notification[] = [
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
];

// Components
const SearchField = ({ isMobile = false, onToggle }: { isMobile?: boolean; onToggle?: () => void }) => {
    if (isMobile) {
        return (
            <div
                onClick={onToggle}
                className="block sm:hidden bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800"
            >
                <Search size={22} strokeWidth={1.3} />
            </div>
        );
    }

    return (
        <div className="hidden sm:block relative">
            <Input
                className="w-55 md:w-76 lg:w-88 xl:w-98 rounded-md bg-zinc-100 focus-visible:ring-1 focus-visible:ring-blue-400 placeholder:text-sm pr-8 dark:bg-slate-700 dark:border-slate-600"
                placeholder="جستجو ..."
            />
            <Search size={20} strokeWidth={1.5} className="absolute top-2 right-2 text-blue-400" />
        </div>
    );
};

const MobileSearch = ({ isSearching, setIsSearching }: { isSearching: boolean; setIsSearching: (value: boolean) => void }) => {
    const searchRef = useRef<HTMLDivElement>(null);

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

    if (!isSearching) return null;

    return (
        <div ref={searchRef} className="absolute inset-0 mt-4.75 flex items-center px-1">
            <div className="flex items-center w-full relative">
                <Search size={20} strokeWidth={1.5} className="absolute right-3 text-blue-400" />
                <Input
                    autoFocus
                    className="w-full pl-3 pr-10 rounded-md bg-zinc-100 focus-visible:ring-1 focus-visible:ring-blue-400 placeholder:text-sm dark:bg-slate-700 dark:border-slate-600"
                    placeholder="جستجو ..."
                />
                <button
                    onClick={() => setIsSearching(false)}
                    className="absolute left-3 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                    <X className="border-2 border-zinc-500 hover:text-zinc-700 rounded-full dark:border-zinc-400 dark:hover:text-zinc-300" size={20} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};

const QuickActionsGroup = () => (
    <div className="lg:flex items-center gap-x-3 hidden">
        {QUICK_ACTIONS.map(action => {
            const IconComponent = action.icon;
            return (
                <Link
                    key={action.id}
                    href={action.href}
                    className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800"
                    title={action.title}
                >
                    <IconComponent size={22} strokeWidth={1.3} />
                </Link>
            );
        })}
    </div>
);

const ThemeToggle = () => {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                    <Sun size={22} strokeWidth={1.3} className="dark:hidden" />
                    <Moon size={22} strokeWidth={1.3} className="hidden dark:block" />
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
    );
};

const LanguageSelector = ({ language, setLanguage }: { language: "fa" | "en"; setLanguage: (lang: "fa" | "en") => void }) => {
    const currentLanguage = LANGUAGES.find(lang => lang.code === language);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                    <Image
                        className="rounded-full w-5.5 h-5.5"
                        src={currentLanguage?.flag}
                        alt={currentLanguage?.name || "language"}
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ direction: "rtl" }}>
                {LANGUAGES.map(lang => (
                    <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                        <Image className="rounded-full w-5 h-5" src={lang.flag} alt={lang.name} />
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const NotificationItem = ({ notification, onRemove }: { notification: Notification; onRemove: (id: number) => void }) => (
    <div className="flex items-center justify-between gap-x-2 mt-2 border-b last:border-0 border-zinc-200 dark:border-zinc-700 pb-2">
        <div className="flex gap-x-2">
            <div className="w-11 h-11 flex-shrink-0 relative">
                <Image
                    src={notification.avatar}
                    width={44}
                    height={44}
                    alt={`${notification.name} avatar`}
                    className="object-cover rounded-full"
                />
                <span className="absolute right-1 bottom-1 translate-x-1/4 translate-y-1/4 bg-green-600 w-2 h-2 rounded-full border-2 border-white dark:border-slate-800" />
            </div>
            <div className="flex flex-col space-y-2">
                <p className="text-[13px]">{notification.text}</p>
                <span className="text-[10px] dark:text-gray-400">{notification.time}</span>
            </div>
        </div>
        <button
            onClick={() => onRemove(notification.id)}
            className="ml-2 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-700 dark:hover:bg-slate-800 transition-colors"
        >
            <X size={14} strokeWidth={2} className="text-zinc-600 dark:text-zinc-300" />
        </button>
    </div>
);

const NotificationsDropdown = ({ notifications, onRemoveNotification }: { notifications: Notification[]; onRemoveNotification: (id: number) => void }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                <div className="relative">
                    <BellRing size={22} strokeWidth={1.3} />
                    {notifications.length > 0 && (
                        <>
                            <span className="absolute -left-0.75 -top-1.25 bg-green-600 w-1.25 h-1.25 rounded-full" />
                            <span className="absolute -left-1 -top-1.75 bg-green-600 w-1.75 h-1.75 rounded-full animate-ping" />
                        </>
                    )}
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
                            {notifications.map(notification => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRemove={onRemoveNotification}
                                />
                            ))}
                            <Link href="/notifications">
                                <span className="text-[14px] text-white dark:bg-blue-600 bg-blue-500 rounded-md mt-2 p-2 block text-center hover:bg-blue-700 transition-colors">
                                    خواندن همه اعلان‌ها
                                </span>
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

const ProfileDropdown = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className="transition-all cursor-pointer">
                <Image
                    src={UserProfile}
                    className="rounded-full w-9.5 h-9.5 grayscale-50 hover:grayscale-0 transition-all duration-200"
                    alt="profile"
                    width={36}
                    height={36}
                />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-2 shadow-lg rounded-lgl" style={{ direction: "rtl" }}>
            <DropdownMenuItem className="px-2 py-1 focus:bg-transparent cursor-default">
                <div className="flex items-center gap-3">
                    <Image
                        src={UserProfile}
                        className="rounded-lg w-10 h-10 object-cover"
                        width={40}
                        height={40}
                        alt="profile"
                    />
                    <div className="flex flex-col">
                        <span className="text-[13px] font-medium">محمد متین علی اکبری</span>
                        <span className="text-[12.5px] text-zinc-500">example@gmail.com</span>
                    </div>
                </div>
            </DropdownMenuItem>

            <div className="space-y-2 mt-4">
                {PROFILE_MENU_ITEMS.map(item => {
                    const IconComponent = item.icon;
                    const textColor = item.isDanger
                        ? "text-red-400 dark:text-red-400"
                        : "text-gray-700 dark:text-gray-400";
                    const iconColor = item.isDanger
                        ? "text-red-500 dark:text-red-400"
                        : "";

                    return (
                        <DropdownMenuItem key={item.id} asChild>
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

const Logo2 = ({ isDesktopSidebarOpen }: { isDesktopSidebarOpen: boolean }) => (
    <div className={`${isDesktopSidebarOpen ? 'lg:hidden' : 'flex items-center'}`}>
        <Link href="/" className="flex items-center gap-x-2">
            <Image className="w-8 h-8 md:w-9 md:h-9" src={Logo} alt="logo" />
            <h1 className="hidden sm:block sm:text-xl md:text-2xl dark:text-white">توسکا</h1>
        </Link>
    </div>
);

const MobileSidebarButton = ({ setIsMobileSidebarOpen, isMobileSidebarOpen }: {
    setIsMobileSidebarOpen: (open: boolean) => void;
    isMobileSidebarOpen: boolean;
}) => (
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

const DesktopSidebarButton = ({ isDesktopSidebarOpen, setIsDesktopSidebarOpen }: {
    isDesktopSidebarOpen: boolean;
    setIsDesktopSidebarOpen: (open: boolean) => void;
}) => (
    <div className="hidden lg:block">
        {!isDesktopSidebarOpen && (
            <button
                onClick={() => setIsDesktopSidebarOpen(true)}
                className="bg-zinc-100 rounded-full p-1.75 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800"
            >
                <Menu size={22} strokeWidth={1.3} />
            </button>
        )}
    </div>
);

// Custom Hooks
const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
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
            console.log(error);
        }
    };

    return [storedValue, setValue] as const;
};

// Main Component
export default function Navbar() {
    const [isSearching, setIsSearching] = useState(false);
    const [language, setLanguage] = useLocalStorage<"fa" | "en">("language", "fa");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

    const handleRemoveNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <>
            <nav className={`w-full sticky inset-x-0 top-0 py-2 h-14 bg-white z-50 shadow-xs dark:bg-slate-900 transition-all duration-300 ${isDesktopSidebarOpen ? 'lg:pr-62 xl:pr-66' : ''
                }`}>
                <MaxWidthWrapper>
                    <div className="flex justify-between items-center relative">
                        {/* Left Side - Logo and Menu */}
                        {!isSearching && (
                            <div className="flex items-center gap-x-3">
                                <Logo2 isDesktopSidebarOpen={isDesktopSidebarOpen} />

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

                        {/* Mobile Search Overlay */}
                        <MobileSearch isSearching={isSearching} setIsSearching={setIsSearching} />

                        {/* Right Side - Actions */}
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

            {/* Desktop Sidebar */}
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