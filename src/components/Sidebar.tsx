"use client"

import { BarChart3, ChevronLeft, LayoutDashboard, Menu, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../public/images/logo/logo.svg";
import Link from "next/link";

interface SideBarPropsType {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    isDesktop?: boolean;
    isDesktopOpen?: boolean;
    setIsDesktopOpen?: (isOpen: boolean) => void;
}

export default function Sidebar({ setIsOpen, isOpen, isDesktop = false, isDesktopOpen = false, setIsDesktopOpen }: SideBarPropsType) {

    const [isDashboardOpen, setIsDashboardOpen] = useState(false);

    // تابع برای بستن sidebar هنگام کلیک خارج از آن (فقط برای موبایل)
    useEffect(() => {
        if (isDesktop || !isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;
            // اگر کلیک روی خود sidebar یا دکمه باز کردن نباشد، sidebar را ببند
            if (!target.closest('aside') && !target.closest('[data-sidebar-trigger]')) {
                setIsOpen(false);
            }
        };

        // تاخیر کوتاه برای جلوگیری از بسته شدن فوری
        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen, isDesktop]);

    // بستن منوی داشبورد وقتی sidebar بسته می‌شود
    useEffect(() => {
        if (isDesktop) {
            if (!isDesktopOpen) {
                setIsDashboardOpen(false);
            }
        } else {
            if (!isOpen) {
                setIsDashboardOpen(false);
            }
        }
    }, [isOpen, isDesktop, isDesktopOpen]);

    if (isDesktop) {
        return (
            <>
                {/* Sidebar دسکتاپ */}
                <aside className={`fixed inset-y-0 right-0 w-80 lg:w-68 xl:w-72 bg-white shadow-sm transform transition-transform duration-300 ease-in-out z-60 dark:bg-slate-900 ${isDesktopOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-x-3">
                                <Image src={Logo} className="w-8 h-8" alt="logo" />
                                <h3 className="text-2xl font-medium dark:text-white">توسکا</h3>
                            </div>
                            <button
                                onClick={() => setIsDesktopOpen && setIsDesktopOpen(false)}
                                className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors rtl:rotate-180 cursor-pointer"
                            >
                                <svg className="m-auto h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-2 px-1">
                            {/* آیتم داشبورد با منوی کشویی */}
                            <div>
                                <div onClick={() => setIsDashboardOpen(!isDashboardOpen)} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                    <div className="flex items-center gap-x-2">
                                        <LayoutDashboard className="fill-gray-300 text-gray-400" size={19} strokeWidth={2} />
                                        <h4 className="text-[15px] text-gray-700 dark:text-gray-200">داشبورد</h4>
                                    </div>
                                    <ChevronLeft size={17} className={`text-gray-700 dark:text-gray-200 transition-transform duration-300 ease-in-out ${isDashboardOpen ? 'rotate-270' : 'rotate-0'}`} />
                                </div>

                                {/* زیرمنوی داشبورد */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDashboardOpen ? 'max-h-96' : 'max-h-0'}`}>
                                    <ul className="mt-2 mr-6 space-y-1">
                                        <Link href="/" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                            <div className="w-2 h-[1px] bg-gray-400"></div>
                                            <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">فروش</li>
                                        </Link>
                                        <Link href="/analytics" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                            <div className="w-2 h-[1px] bg-gray-400"></div>
                                            <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">تجزیه و تحلیل</li>
                                        </Link>
                                        <Link href="/finance" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                            <div className="w-2 h-[1px] bg-gray-400"></div>
                                            <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">مالی</li>
                                        </Link>
                                        <Link href="/crypto" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                            <div className="w-2 h-[1px] bg-gray-400"></div>
                                            <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">ارز دیجیتال</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </>
        );
    }

    return (
        <>
            {/* دکمه باز کردن Sidebar موبایل */}
            <button onClick={() => setIsOpen(true)} data-sidebar-trigger className="bg-zinc-100 rounded-full p-1.75 sm:order-0 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
                <Menu size={24} strokeWidth={1.3} />
            </button>

            {/* Backdrop - پس‌زمینه سیاه شفاف */}
            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" />
            )}

            {/* Sidebar موبایل */}
            <aside className={`fixed inset-y-0 right-0 w-[55vw] sm:w-80 md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 dark:bg-slate-900 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-x-3">
                            <Image src={Logo} className="w-8 h-8" alt="logo" />
                            <h3 className="text-2xl font-medium dark:text-white">توسکا</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors rtl:rotate-180 cursor-pointer">
                            <svg className="m-auto h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-2 px-1">
                        {/* آیتم داشبورد با منوی کشویی */}
                        <div>
                            <div onClick={() => setIsDashboardOpen(!isDashboardOpen)} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                <div className="flex items-center gap-x-2">
                                    <LayoutDashboard className="fill-gray-300 text-gray-400" size={19} strokeWidth={2} />
                                    <h4 className="text-[15px] text-gray-700 dark:text-gray-200">داشبورد</h4>
                                </div>
                                <ChevronLeft size={17} className={`text-gray-700 dark:text-gray-200 transition-transform duration-300 ease-in-out ${isDashboardOpen ? 'rotate-270' : 'rotate-0'}`} />
                            </div>

                            {/* زیرمنوی داشبورد */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDashboardOpen ? 'max-h-96' : 'max-h-0'}`}>
                                <ul className="mt-2 mr-6 space-y-1">
                                    <Link href="/" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                        <div className="w-2 h-[1px] bg-gray-400"></div>
                                        <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">فروش</li>
                                    </Link>
                                    <Link href="/analytics" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                        <div className="w-2 h-[1px] bg-gray-400"></div>
                                        <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">تجزیه و تحلیل</li>
                                    </Link>
                                    <Link href="/finance" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                        <div className="w-2 h-[1px] bg-gray-400"></div>
                                        <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">مالی</li>
                                    </Link>
                                    <Link href="/crypto" className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
                                        <div className="w-2 h-[1px] bg-gray-400"></div>
                                        <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">ارز دیجیتال</li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}