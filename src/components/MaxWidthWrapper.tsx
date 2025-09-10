export default function MaxWidthWrapper({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={`max-w-screen-xl mx-auto px-2 w-full h-full flex flex-col ${className}`}>
            {children}
        </div>
    );
}