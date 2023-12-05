import './globals.css'
import NavBar from "./components/Navbar";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <body>
        <main className="bg-gray-100 min-h-screen w-screen">
                <main className="max-w-screen-2xl m-auto bg-white">
                    <NavBar/>
                    {children}
                </main>
        </main>
        </body>
        </html>
    )
}
