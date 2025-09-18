import { BatteryPlus, BookOpenText, CalendarClock, CircleDollarSign, LayoutDashboard, ListTodo, LockKeyhole, MailCheck, MapPinned, MessageSquareDot, NotepadText, UsersRound } from "lucide-react";


// تایپ اصلی برای پراپس کامپوننت sidebar
export interface SideBarProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    isDesktop?: boolean;
    isDesktopOpen?: boolean;
    setIsDesktopOpen?: (isOpen: boolean) => void;
}


// تایپ برای آیتم‌های منو
export interface MenuItem {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    href?: string;
    children?: SubMenuItem[];
}


//  تایپ برای زیرآیتم‌های منو
export interface SubMenuItem {
    id: string;
    title: string;
    href: string;
}


// تایپ برای بخش‌های مختلف منو

export interface MenuSection {
    id: string;
    title?: string;
    items: MenuItem[];
}




//  داده‌های اصلی منوی sidebar
//  شامل بخش‌های مختلف: داشبورد، برنامه‌ها، کاربران و صفحات
export const SIDEBAR_MENU_DATA: MenuSection[] = [
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
            {
                id: "pages",
                title: "صفحات",
                icon: BookOpenText,
                children: [
                    { id: "contact-us", title: "تماس با ما", href: "/contact-us" },
                    { id: "faq", title: "سوالات متداول", href: "/page-faq" },
                ]
            },
            {
                id: "authentication",
                title: "احراز هویت",
                icon: LockKeyhole,
                children: [
                    { id: "login", title: "صفحه لاگین", href: "/signin" },
                    { id: "register", title: "صفحه ثبت نام", href: "/signup" },
                    { id: "lockscreen", title: "صفحه بازگشایی", href: "/lockscreen" },
                    { id: "password-reset", title: "فراموشی رمز عبور", href: "/password-reset" },
                ]
            }
        ]
    },
];


//  کلاس‌های CSS برای اسکرول سفارشی sidebar
export const SIDEBAR_SCROLL_CLASSES = `
  /* اسکرول سفارشی برای sidebar */
  .sidebar-custom-scroll {
    scrollbar-width: none;
  }
`;