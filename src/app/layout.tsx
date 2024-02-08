import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './../styles/globals.css'
import {clsx} from "clsx";
import ThemeProvider from "@/theme/ThemeProvider";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import React from "react";
import Sidebar from "@/layout/Sidebar";
import Main from "@/layout/Main";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Ping Stability Test',
    description: 'Allow you to test your stability connection about an online game.',
}

type LayoutProps = {
    children: React.ReactNode;
    modal?: React.ReactNode;
};

export default function RootLayout({children, modal}: LayoutProps) {
    return (
        <html lang="fr" className="h-full" suppressHydrationWarning>
        <body className={clsx(inter.className, 'bg-background h-full')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="h-screen w-full relative flex overflow-hidden">
                <Sidebar/>
                <div className="w-full h-full flex flex-col justify-between">
                    <Header/>
                    <Main children={children}/>
                    <Footer/>
                </div>
            </div>
            {modal}
        </ThemeProvider>
        </body>
        </html>
    )
}
