import { ReactNode } from "react";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicNavbar />
      <main className="pt-16 md:pt-20 lg:pt-24 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}