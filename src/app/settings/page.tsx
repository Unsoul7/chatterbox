"use client";

import Link from "next/link";
import ProfileNav from "../components/ProfileNav";
import { useRouter } from "next/navigation";

export default function Settings() {

    const router = useRouter()

    const logOut = () => {
        localStorage.clear()
        router.push('/login')
    }

    return(
    <div className="w-full ">
        <Link href='/profile'>
        <span className="material-symbols-outlined p-5">
arrow_back
</span>
        </Link>
        <button className="border w-full h-12" onClick={logOut}>Log out</button>
    </div>)
}