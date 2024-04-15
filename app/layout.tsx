import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import StoreProvider from "./StoreProvider";
// import SideBar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cadbid ERP",
  description: "Created by Cadbid.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className} aria-label="main_body">
          <NavBar />
          {/* <SideBar /> */}
          <div aria-label="all-children">{children}</div>
        </body>
      </StoreProvider>
    </html>
  );
}
