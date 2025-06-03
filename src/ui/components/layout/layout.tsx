import { AlertProvider } from "@/context/alert/alert.provider";

interface LayoutProps {
  children: React.ReactNode
  className?: string;
}

export function Layout({ children, className = "" }: LayoutProps) {
  return (
    <main className={`max-w-[75rem] h-[100vh] mx-auto p-4 sm:p-6 lg:p-8 ${className}`}>
      <AlertProvider>
        {children}
      </AlertProvider>
    </main>
  );
}