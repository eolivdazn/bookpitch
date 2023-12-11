"use client";
import Link from "next/link";


export default function NavBar() {
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/search" className="font-bold text-gray-700 text-2xl"> Book Pitch </Link>
        </nav>

    )
}