import { MobileNav } from "@/components/MobileNav";
import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const loggedIn = {
    firstName : 'Pietro', lastName:"Savini"
  };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      {/* Mobile Menu Button with mobile Navbar */}
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src={'/icons/logo.svg'}  width={30} height={30} alt="menuIcon"/>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
      {children}
      </div>

    </main>
  );
}
