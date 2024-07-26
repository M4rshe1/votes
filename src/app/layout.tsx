import type {Metadata} from "next";
import {Inter} from "next/font/google";
import React, {Suspense} from "react";
import "./globals.css";
import ThemeProvider from "@/lib/themeProvider";
import Provider from "@/lib/provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Loading from "@/app/loading";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "NoVotes - A simple voting app",
    description: "A simple voting app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider>
            <Provider>
                <body className={inter.className}>
                <Header/>
                <Suspense fallback={<Loading/>}>
                    <main className="flex min-h-screen flex-col items-center justify-between w-full">
                        {children}
                    </main>
                </Suspense>
                <Footer/>
                </body>
            </Provider>
        </ThemeProvider>
    );
}
