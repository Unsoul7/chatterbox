"use client";
import Link from "next/link";
import './style.css'
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./context";
import { useRouter } from "next/navigation";
export default function Singup() {
  const {Login ,setLogin } = useContext(LoginContext)
  const [FullName, setFullName] = useState('')
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [Warning, setWarning] = useState(false)
  const [Exists, setExists] = useState(false)

  const [Empty, setEmpty] = useState(false)

  const router = useRouter()


  const RegisterAccount = async () => {
    if(Password != ConfirmPassword){
      return
    }
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: FullName,
      username: Username,
    password: Password
  })
})

    if (response.status == 200) {
      const data = await response.json()
      localStorage.setItem('login','true')
      localStorage.setItem('username',Username)
      setLogin(true)

    }else if(response.status == 403){
      console.log('error', response);
      setEmpty(true)
      localStorage.setItem('login', 'false')
    }else if(response.status == 400){
      console.log('error', response);
      setExists(true)
      localStorage.setItem('login', 'false')
    }
       else {
      console.log('error', response);
      localStorage.setItem('login', 'false')
      setExists(true)
    }
  }

  useEffect(() => {
    if ( localStorage.getItem('login') == 'true') {
      router.push('/home')
    }
  }, [localStorage.getItem('login'), router, Login])

  if (localStorage.getItem('login') != 'true' ) {

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <img src="./logo.png" className="w-1/2 py-10" alt="" />
        <div className="w-2/3 flex flex-col items-center">
        {Empty ? <p className="text-sm">Fields cannot be empty!</p> : ''}
        {Exists ? <p className="text-sm">Username Already Exists!</p> : ''}
          <input className="form-fields" type="text" onChange={(e) => setFullName(e.target.value)} value={FullName} placeholder="Full Name" />
          <input className="form-fields" type="text" onChange={(e) => setUsername(e.target.value)} value={Username} placeholder="Set Username" />
          <input className="form-fields" type="password" onChange={(e) => setPassword(e.target.value)} value={Password} placeholder="Set Password" />
          <input className={`form-fields ${Warning ? `border-red-500` : `border`}`} type="password" onChange={(e) => {
            Password != e.target.value ? setWarning(true) : setWarning(false)
            setConfirmPassword(e.target.value)
          }} value={ConfirmPassword} placeholder="Confirm Password" />
          <Link href='/login' className="text-sm">Already on ChatterBox? Login here</Link>
          <button onClick={() => RegisterAccount()} className={`form-fields  text-white my-5 ${Password != ConfirmPassword ? 'bg-slate-500' :'bg-red-600' } `}>Sign up</button>
        </div>
      </div>
    )

  }
}
