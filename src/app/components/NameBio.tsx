'use client';
import React,{useState, useEffect} from "react";
import '../style.css'
import { useRouter } from "next/navigation";

export default function NameBio() {

    const router = useRouter()
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
        <div className="w-full flex flex-col px-5">
            <h1 className="text-lg">{userData ? userData.fullname : "loading..."}</h1>
            <p>{userData ? userData.bio : "loading..."}</p>
            <div className="flex w-full py-5">
                <button onClick={() => router.push("/editprofile")} className="w-1/2 mr-2 rounded-lg bg-slate-200 p-2 text-sm">Edit Profile</button>
                <button className="w-1/2 ml-2 rounded-lg bg-slate-200 p-2 text-sm">Share Profile</button>
            </div>
        </div>
    );
}
