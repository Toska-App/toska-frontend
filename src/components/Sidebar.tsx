"use client"

import {
    BatteryPlus,
    CalendarClock,
    ChevronLeft,
    CircleDollarSign,
    LayoutDashboard,
    ListTodo,
    MailCheck,
    MapPinned,
    Menu,
    MessageSquareDot,
    NotepadText,
    UsersRound
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../public/images/logo/logo.svg";
import Link from "next/link";

// Types
interface SideBarProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    isDesktop?: boolean;
    isDesktopOpen?: boolean;
    setIsDesktopOpen?: (isOpen: boolean) => void;
}

interface MenuItem {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    href?: string;
    children?: SubMenuItem[];
}

interface SubMenuItem {
    id: string;
    title: string;
    href: string;
}

interface MenuSection {
    id: string;
    title?: string;
    items: MenuItem[];
}

// Data
const MENU_DATA: MenuSection[] = [
    {
        id: "dashboard",
        items: [
            {
                id: "dashboard",
                title: "داشبورد",
                icon: LayoutDashboard,
                children: [
                    { id: "sales", title: "فروش", href: "/" },
                    { id: "analytics", title: "تجزیه و تحلیل", href: "/analytics" },
                    { id: "finance", title: "مالی", href: "/finance" },
                    { id: "crypto", title: "ارز دیجیتال", href: "/crypto" }
                ]
            }
        ]
    },
    {
        id: "applications",
        title: "برنامه ها",
        items: [
            {
                id: "chat",
                title: "چت",
                icon: MessageSquareDot,
                href: "/chat"
            },
            {
                id: "mailbox",
                title: "صندوق پستی",
                icon: MailCheck,
                href: "/mailbox"
            },
            {
                id: "todolist",
                title: "لیست انجام کار",
                icon: ListTodo,
                href: "/todolist"
            },
            {
                id: "notes",
                title: "یادداشت ها",
                icon: NotepadText,
                href: "/notes"
            },
            {
                id: "scrumboard",
                title: "اسکرام",
                icon: BatteryPlus,
                href: "/scrumboard"
            },
            {
                id: "contacts",
                title: "مخاطبین",
                icon: MapPinned,
                href: "/contacts"
            },
            {
                id: "invoice",
                title: "فاکتور",
                icon: CircleDollarSign,
                children: [
                    { id: "invoice-list", title: "لیست", href: "/invoice-list" },
                    { id: "invoice-preview", title: "پیش نمایش", href: "/invoice-preview" },
                    { id: "invoice-add", title: "افزودن", href: "/invoice-add" },
                    { id: "invoice-edit", title: "ویرایش", href: "/invoice-edit" }
                ]
            },
            {
                id: "calendar",
                title: "تقویم",
                icon: CalendarClock,
                href: "/calendar"
            }
        ]
    },
    {
        id: "usersandpages",
        title: "کاربران و صفحات",
        items: [
            {
                id: "users",
                title: "کاربران",
                icon: UsersRound,
                children: [
                    { id: "user-profile", title: "پروفایل", href: "/user-profile" },
                    { id: "user-account", title: "تنظیمات حساب", href: "/user-account" },
                ]
            },
        ]
    }
];

// Components
const SidebarCloseButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors rtl:rotate-180 cursor-pointer"
    >
        <svg className="m-auto h-5 w-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>
);

const SidebarHeader = ({ onClose }: { onClose: () => void }) => (
    <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-x-3">
            <Image src={Logo} className="w-8 h-8" alt="logo" />
            <h3 className="text-2xl font-medium dark:text-white">توسکا</h3>
        </div>
        <SidebarCloseButton onClick={onClose} />
    </div>
);

const SectionTitle = ({ title }: { title: string }) => (
    <div className="mt-4 mb-3 -mx-5">
        <div className="py-2 px-5 bg-sidebar-title-light dark:bg-sidebar-title-dark">
            <span className="text-sm text-gray-700 dark:text-gray-300">{title}</span>
        </div>
    </div>
);

const SubMenuItems = ({ items, isOpen }: { items: SubMenuItem[], isOpen: boolean }) => (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="mt-2 mr-6 space-y-1">
            {items.map(item => (
                <Link
                    key={item.id}
                    href={item.href}
                    className="group flex items-center gap-x-2 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                    <div className="w-2 h-[1px] bg-gray-400" />
                    <li className="text-[13px] text-gray-600 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">
                        {item.title}
                    </li>
                </Link>
            ))}
        </ul>
    </div>
);

const MenuItemComponent = ({
    item,
    openSubmenus,
    toggleSubmenu
}: {
    item: MenuItem,
    openSubmenus: Set<string>,
    toggleSubmenu: (id: string) => void
}) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubmenus.has(item.id);
    const IconComponent = item.icon;

    if (hasChildren) {
        return (
            <div>
                <div
                    onClick={() => toggleSubmenu(item.id)}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                    <div className="flex items-center gap-x-2">
                        <IconComponent
                            className="fill-gray-300 text-gray-400 group-hover:fill-indigo-300 group-hover:text-indigo-400 transition duration-200"
                            size={18}
                            strokeWidth={2}
                        />
                        <h4 className="text-[15px] text-gray-700 dark:text-gray-200">{item.title}</h4>
                    </div>
                    <ChevronLeft
                        size={17}
                        className={`text-gray-700 dark:text-gray-200 transition-transform duration-300 ease-in-out ${isSubmenuOpen ? 'rotate-270' : 'rotate-0'
                            }`}
                    />
                </div>
                <SubMenuItems items={item.children ?? []} isOpen={isSubmenuOpen} />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-x-2 group p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-800 cursor-pointer">
            <IconComponent
                className="fill-gray-300 text-gray-400 group-hover:fill-indigo-300 group-hover:text-indigo-400 transition duration-200"
                size={18}
                strokeWidth={2}
            />
            <Link href={item.href || '#'} className="text-[15px] text-gray-700 dark:text-gray-200">
                {item.title}
            </Link>
        </div>
    );
};

const SidebarContent = ({ onClose }: { onClose: () => void }) => {
    const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

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
            <SidebarHeader onClose={onClose} />

            <div className="space-y-2 px-1">
                {MENU_DATA.map((section, sectionIndex) => (
                    <div key={section.id}>
                        {sectionIndex > 0 && section.title && (
                            <SectionTitle title={section.title} />
                        )}

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

const MobileTriggerButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        data-sidebar-trigger
        className="bg-zinc-100 rounded-full p-1.75 sm:order-0 cursor-pointer hover:bg-zinc-200 hover:text-blue-400 transition-colors dark:bg-slate-700 dark:hover:bg-slate-800"
    >
        <Menu size={22} strokeWidth={1.3} />
    </button>
);

const Backdrop = ({ onClick }: { onClick: () => void }) => (
    <div
        onClick={onClick}
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
    />
);

// Custom Hooks
const useClickOutside = (isOpen: boolean, setIsOpen: (open: boolean) => void, isDesktop: boolean) => {
    useEffect(() => {
        if (isDesktop || !isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;
            if (!target.closest('aside') && !target.closest('[data-sidebar-trigger]')) {
                setIsOpen(false);
            }
        };

        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setIsOpen, isDesktop]);
};

// Main Component
export default function Sidebar({
    setIsOpen,
    isOpen,
    isDesktop = false,
    isDesktopOpen = false,
    setIsDesktopOpen
}: SideBarProps) {
    useClickOutside(isOpen, setIsOpen, isDesktop);

    const handleClose = () => {
        if (isDesktop && setIsDesktopOpen) {
            setIsDesktopOpen(false);
        } else {
            setIsOpen(false);
        }
    };

    if (isDesktop) {
        return (
            <aside className={`fixed inset-y-0 right-0 w-68 bg-white shadow-sm transform transition-transform duration-300 ease-in-out z-60 dark:bg-slate-900 ${isDesktopOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <SidebarContent onClose={handleClose} />
            </aside>
        );
    }

    return (
        <>
            <MobileTriggerButton onClick={() => setIsOpen(true)} />

            {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}

            <aside className={`fixed overflow-y-auto inset-y-0 right-0 w-[52vw] sm:w-80 md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 dark:bg-slate-900 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <SidebarContent onClose={handleClose} />
            </aside>
        </>
    );
}