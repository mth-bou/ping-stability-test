import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { clsx } from "clsx";
import ThemeProvider from "@/app/theme/ThemeProvider";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import React from "react";
import Sidebar from "@/app/components/Sidebar";
import Main from "@/app/layout/Main";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ping Stability Test',
  description: 'Allow you to test your stability connection about an online game.',
}

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="fr" className="h-full">
      <body className={clsx(inter.className, 'bg-background h-full')}>
        <ThemeProvider attribute="class" defaultTheme="myDarkTheme" enableSystem>
            <div className="h-screen w-full relative flex overflow-hidden">
                <Sidebar />
                <div className="w-full h-full flex flex-col justify-between">
                    <Header />
                    <Main children={children} />
                    <Footer />
                </div>
            </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
