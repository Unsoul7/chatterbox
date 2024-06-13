"use client";

import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import Navbar from "../components/Navbar";
import Options from "../components/Options";
import Signup from "../page";
import { useRouter } from "next/navigation";
import { LoginContext } from "../context";

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('login') != 'true') {
            router.push('/')
        }
    },[localStorage.getItem('login'), router])
     if(localStorage.getItem('login') == 'true'){

         return (
             <><Navbar /><Options /></>
            )
        }
    return null
}