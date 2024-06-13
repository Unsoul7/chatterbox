"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context";
import { useRouter } from "next/navigation";
export default function Login() {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [Wrong, setWrong] = useState(false)
    const [Empty, setEmpty] = useState(false)
    
    const router = useRouter()

    const LoginAccount = async () => {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: Username,
                password: Password
            })
        })

        if (response.status == 200) {
            const data = await response.text()
            console.log(response.status);
            router.push('/home')
            localStorage.setItem('login', 'true')
            localStorage.setItem('username',Username)

        }else if(response.status == 403) {

            console.log('error', response);
            localStorage.setItem('login', 'false')
            setEmpty(true)
        }
        else {
            console.log('error', response);
            localStorage.setItem('login', 'false')
            setWrong(true)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('login') == 'true') {
            router.push('/home')
        }
    }, [localStorage.getItem('login'), router])

    if (localStorage.getItem('login') != 'true') {

        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <img src="./logo.png" className="w-1/2 py-6" alt="" />
                <div className="w-2/3 flex flex-col items-center">
                    {Wrong ? <p className="text-sm">Incorrect Username or Password!</p> : ''}
                    {Empty ? <p className="text-sm">Login cannot be empty!</p> : ''}
                    <input className={`form-fields ${Wrong || Empty ? 'border-red-500' : 'border'}`} type="text" onChange={(e) => setUsername(e.target.value)} value={Username} placeholder="Username" />
                    <input className={`form-fields ${Wrong || Empty ? 'border-red-500' : 'border'}`} type="password" onChange={(e) => setPassword(e.target.value)} value={Password} placeholder="Password" />
                    <Link href='/' className="text-sm">Not on ChatterBox? Sign up</Link>
                    <button onClick={() => LoginAccount()} className="form-fields bg-red-600 text-white my-5">Log in</button>
                </div>
            </div>
        )

    }
}
