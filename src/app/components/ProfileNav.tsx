'use client';
import React,  {useState, useEffect} from "react";
import '../style.css'
import Link from "next/link";
export default function ProfileNav() {

    const [userData, setUserData] = useState([])
    const fetchUser = async () => {

        try {
        const user = await fetch('http://localhost:5000/api/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username : localStorage.getItem('username')
            })
        })


            const data = await user.json()
            setUserData(data)
            

        } catch (error) {
            alert('fail to load profile')
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    },[])

return (
        <nav className="nav">
            <h1 className="px-2 text-lg">@{userData ? userData.username : "loading..."}</h1>
            <div className="h-full flex flex-row items-center">
                <Link href={'/settings'}>
                <span className="material-symbols-outlined px-4">
                    menu
                </span>
                </Link>
            </div>
        </nav>
    );
}
