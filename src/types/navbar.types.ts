import { Calendar, ClipboardPen, LockKeyhole, LogOut, Mail, MessageCircleMore, User } from "lucide-react";
import UserProfile from "../../public/images/user-profile.jpeg";
import Profile2 from "../../public/images/profile-16.jpeg";
import Profile3 from "../../public/images/profile-34.jpeg";
import IR from "../../public/images/IR.svg";
import EN from "../../public/images/EN.svg";


//  تایپ برای اطلاعات اعلانات
export interface Notification {
    id: number;
    name: string;
    text: string;
    time: string;
    avatar: any;
}


// تایپ برای تنظیمات زبان
export interface Language {
    code: "fa" | "en";
    name: string;
    flag: string;
}


// تایپ برای دکمه‌های اقدام سریع در navbar
export interface QuickAction {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    href: string;
}


// تایپ برای آیتم‌های منوی پروفایل کاربر
export interface ProfileMenuItem {
    id: string;
    title: string;
    icon: React.ComponentType<any>;
    href: string;
    isDanger?: boolean; // برای آیتم‌هایی مثل خروج که رنگ خطر دارند
}



// لیست زبان‌های پشتیبانی شده در سیستم
export const LANGUAGES: Language[] = [
    { code: "fa", name: "فارسی", flag: IR },
    { code: "en", name: "انگلیسی", flag: EN }
];


// دکمه‌های دسترسی سریع که در navbar نمایش داده می‌شوند
//  فقط در نسخه دسکتاپ قابل مشاهده هستند
export const QUICK_ACTIONS: QuickAction[] = [
    { id: "calendar", title: "تقویم", icon: Calendar, href: "/calendar" },
    { id: "todolist", title: "لیست کار", icon: ClipboardPen, href: "/todolist" },
    { id: "chat", title: "چت", icon: MessageCircleMore, href: "/chat" }
];


//  آیتم‌های منوی پروفایل کاربر در dropdown
export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
    { id: "profile", title: "پروفایل", icon: User, href: "/profile" },
    { id: "mailbox", title: "صندوق ورودی", icon: Mail, href: "/mailbox" },
    { id: "lockscreen", title: "قفل صفحه", icon: LockKeyhole, href: "/lockscreen" },
    { id: "logout", title: "خروج", icon: LogOut, href: "/logout", isDanger: true }
];


//  اعلانات اولیه برای نمایش در dropdown اعلانات
//  باید از API دریافت شوند
export const INITIAL_NOTIFICATIONS: Notification[] = [
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


// اطلاعات پروفایل کاربر فعلی
// باید از context یا store مدیریت شود
export const CURRENT_USER = {
    name: "محمد متین علی اکبری",
    email: "example@gmail.com",
    avatar: UserProfile
};