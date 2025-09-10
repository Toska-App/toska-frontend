export default function MaxWidthWrapper({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={`max-w-screen-2xl mx-auto px-4 lg:px-10 w-full h-full flex flex-col ${className}`}>
            {children}
        </div>
    );
}