"use client"

import { ChevronLeft, Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../public/images/logo/logo.svg";
import Link from "next/link";
import { SIDEBAR_MENU_DATA, SIDEBAR_SCROLL_CLASSES } from "@/types/sidebar.types";
import { SideBarProps, MenuItem, SubMenuItem } from "@/types/sidebar.types";


// کامپوننت دکمه بستن sidebar
// آیکون بستن با انیمیشن hover
const SidebarCloseButton = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors rtl:rotate-180 cursor-pointer" aria-label="بستن منو">
        <svg className="m-auto h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>
);


// کامپوننت هدر sidebar شامل لوگو و دکمه بستن
const SidebarHeader = ({ onClose }: { onClose: () => void }) => (
    <div className="flex justify-between items-center mb-4">
        {/* لوگو و نام برند */}
        <Link href="/" className="flex items-center gap-x-3">
            <Image src={Logo} className="w-8 h-8" alt="toska-logo" />
            <h3 className="text-2xl font-medium dark:text-white">توسکا</h3>
        </Link>

        {/* دکمه بستن sidebar */}
        <SidebarCloseButton onClick={onClose} />
    </div>
);


//  کامپوننت عنوان بخش‌های مختلف منو
//  مثل "برنامه ها" یا "کاربران و صفحات"
const SectionTitle = ({ title }: { title: string }) => (
    <div className="mt-4 mb-3 -mx-5">
        <div className="py-2 px-5 bg-sidebar-title-light dark:bg-sidebar-title-dark">
            <span className="text-sm text-gray-700 dark:text-gray-300">{title}</span>
        </div>
    </div>
);


//  کامپوننت نمایش زیرآیتم‌های منو (submenu)
// با انیمیشن باز و بسته شدن
const SubMenuItems = ({ items, isOpen }: { items: SubMenuItem[], isOpen: boolean }) => (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="mt-2 mr-6 space-y-1">
            {items.map(item => (
                <Link key={item.id} className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer transition-colors duration-200" href={item.href}>
                    {/* خط کوچک نشان‌دهنده زیرآیتم */}
                    <div className="w-2 h-[1px] bg-gray-400" />
                    <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">
                        {item.title}
                    </li>
                </Link>
            ))}
        </ul>
    </div>
);


// کامپوننت اصلی برای نمایش هر آیتم منو
// شامل آیکون، متن و مدیریت زیرمنوها
const MenuItemComponent = ({ item, openSubmenus, toggleSubmenu }: { item: MenuItem, openSubmenus: Set<string>, toggleSubmenu: (id: string) => void }) => {
    // بررسی اینکه آیا این آیتم زیرمنو دارد یا نه
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubmenus.has(item.id);
    const IconComponent = item.icon;

    // اگر آیتم زیرمنو دارد، نمایش به صورت dropdown
    if (hasChildren) {
        return (
            <div>
                {/* آیتم اصلی که کلیک روی آن زیرمنو را باز/بسته می‌کند */}
                <div onClick={() => toggleSubmenu(item.id)} className="group flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer transition-all duration-200" tabIndex={0} role="button" aria-expanded={isSubmenuOpen} aria-haspopup="true">
                    <div className="flex items-center gap-x-2">
                        <IconComponent className="fill-gray-300 text-gray-400 group-hover:fill-indigo-300 group-hover:text-indigo-400 dark:group-hover:fill-indigo-400 dark:group-hover:text-indigo-500 transition duration-200" size={16} strokeWidth={2} />
                        <h4 className="text-[13.5px] text-gray-700 dark:text-gray-200">
                            {item.title}
                        </h4>
                    </div>

                    {/* فلش نشان‌دهنده وضعیت باز/بسته بودن زیرمنو */}
                    <ChevronLeft size={15} className={`text-gray-700 dark:text-gray-200 transition-transform duration-300 ease-in-out ${isSubmenuOpen ? 'rotate-270' : 'rotate-0'}`} />
                </div>

                {/* نمایش زیرآیتم‌ها */}
                <SubMenuItems items={item.children ?? []} isOpen={isSubmenuOpen} />
            </div>
        );
    }

    // اگر آیتم زیرمنو ندارد، نمایش به صورت لینک ساده
    return (
        <div className="flex items-center gap-x-2 group p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer transition-all duration-200">
            <IconComponent className="fill-gray-300 text-gray-400 group-hover:fill-indigo-300 group-hover:text-indigo-400 dark:group-hover:fill-indigo-400 dark:group-hover:text-indigo-500 transition duration-200" size={16} strokeWidth={2} />
            <Link href={item.href || '#'} className="text-[13.5px] text-gray-700 dark:text-gray-200">
                {item.title}
            </Link>
        </div>
    );
};


// کامپوننت اصلی محتوای sidebar
// شامل هدر، منوها و مدیریت state زیرمنوها
const SidebarContent = ({ onClose }: { onClose: () => void }) => {
    // state برای مدیریت وضعیت باز/بسته بودن زیرمنوها
    const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());


    // تابع toggle کردن وضعیت زیرمنوها
    // اگر باز است می‌بندد، اگر بسته است باز می‌کند
    const toggleSubmenu = (itemId: string) => {
        setOpenSubmenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    return (
        <div className="p-4">
            {/* هدر sidebar */}
            <SidebarHeader onClose={onClose} />

            {/* محتوای اصلی منو */}
            <div className="space-y-2 px-1">
                {SIDEBAR_MENU_DATA.map((section, sectionIndex) => (
                    <div key={section.id}>
                        {/* عنوان بخش (فقط از بخش دوم به بعد) */}
                        {sectionIndex > 0 && section.title && (
                            <SectionTitle title={section.title} />
                        )}

                        {/* آیتم‌های هر بخش */}
                        <div className="space-y-2">
                            {section.items.map(item => (
                                <MenuItemComponent
                                    key={item.id}
                                    item={item}
                                    openSubmenus={openSubmenus}
                                    toggleSubmenu={toggleSubmenu}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// دکمه باز کردن sidebar در نسخه موبایل
const MobileTriggerButton = ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick} data-sidebar-trigger className="bg-zinc-100 rounded-full p-1.75 sm:order-0 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800">
        <Menu size={22} strokeWidth={1.3} />
    </button>
);


//  پس‌زمینه تیره برای نسخه موبایل
//  کلیک روی آن sidebar را می‌بندد
const Backdrop = ({ onClick }: { onClick: () => void }) => (
    <div onClick={onClick} className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" aria-label="بستن منو" />
);


// Hook سفارشی برای مدیریت کلیک خارج از sidebar
// فقط در نسخه موبایل فعال است
const useClickOutside = (isOpen: boolean, setIsOpen: (open: boolean) => void, isDesktop: boolean) => {
    useEffect(() => {
        // اگر desktop است یا sidebar باز نیست، listener نمی‌گذاریم
        if (isDesktop || !isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;
            // اگر کلیک خارج از sidebar و دکمه trigger بود، sidebar را ببند
            if (!target.closest('aside') && !target.closest('[data-sidebar-trigger]')) {
                setIsOpen(false);
            }
        };

        // تاخیر کوچک برای جلوگیری از بسته شدن فوری
        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen, isDesktop]);
};


// کامپوننت اصلی Sidebar
// شامل نسخه‌های موبایل و دسکتاپ

export default function Sidebar({ setIsOpen, isOpen, isDesktop = false, isDesktopOpen = false, setIsDesktopOpen }: SideBarProps) {
    // استفاده از hook برای مدیریت کلیک خارج از sidebar
    useClickOutside(isOpen, setIsOpen, isDesktop);


    //  تابع بستن sidebar
    //  برای نسخه دسکتاپ از setIsDesktopOpen استفاده می‌کند
    const handleClose = () => {
        if (isDesktop && setIsDesktopOpen) {
            setIsDesktopOpen(false);
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // بررسی وجود style tag قبلی
        if (!document.getElementById('sidebar-scroll-styles')) {
            const style = document.createElement('style');
            style.id = 'sidebar-scroll-styles';
            style.textContent = SIDEBAR_SCROLL_CLASSES;
            document.head.appendChild(style);
        }
    }, []);


    // نسخه دسکتاپ sidebar
    if (isDesktop) {
        return (
            <aside className={`fixed overflow-y-auto inset-y-0 right-0 w-68 bg-white shadow-sm transform transition-transform duration-300 ease-in-out z-60 sidebar-custom-scroll dark:bg-slate-900 ${isDesktopOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <SidebarContent onClose={handleClose} />
            </aside>
        );
    }

    // نسخه موبایل sidebar
    return (
        <>
            {/* دکمه باز کردن sidebar */}
            <MobileTriggerButton onClick={() => setIsOpen(true)} />

            {/* پس‌زمینه تیره */}
            {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}

            {/* sidebar اصلی */}
            <aside className={`fixed overflow-y-auto inset-y-0 right-0 w-[52vw] sm:w-80 md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 sidebar-custom-scroll dark:bg-slate-900 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <SidebarContent onClose={handleClose} />
            </aside>
        </>
    );
}