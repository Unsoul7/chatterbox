'use client';
import Options from "../components/Options"
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Editprofile() {
  const [FullName, setFullName] = useState('')
  const [FullNameSaved, setFullNameSaved] = useState(false)

  const [Username, setUsername] = useState('')
  const [UsernameSave, setUsernameSaved] = useState(false)
  const [UsernameExists, setUsernameExists] = useState(true)

  const [Email, setEmail] = useState('')
  const [EmailSave, setEmailSave] = useState(false)
  const [EmailExists, setEmailExists] = useState(true)

  const [Dob, setDob] = useState('')
  const [DobSave, setDobSave] = useState(false)

  const [Bio, setBio] = useState('')
  const [BioSave, setBioSave] = useState(false)

  const [File, setFile] = useState(null)
  const [DpSave, setDpSave] = useState(false)

  const [Warning, setWarning] = useState(false)
  const [Empty, setEmpty] = useState(false)
  const router = useRouter()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const changeName = async () => {
    if (FullNameSaved) {
      return
    }
    const response = await fetch('http://localhost:5000/api/editname', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: localStorage.getItem('username'),
        fullname: FullName
      })
    })

    if (response.status == 200) {
      setFullNameSaved(true)
    }
    else if (response.status == 403) {
      setEmpty(true)
    }
    else {
      alert('something went wrong')
    }
  }

  const changeUsername = async () => {
    if (UsernameSave) {
      return
    }
    const response = await fetch('http://localhost:5000/api/editusername', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: localStorage.getItem('username'),
        username: Username
      })
    })

    if (response.status == 200) {
      setUsernameSaved(true)
      localStorage.setItem('username', Username)
    }
    else if (response.status == 403) {
      setEmpty(true)
    }
    else if (response.status == 400) {
      setUsernameExists(false)
    }
    else {
      alert('something went wrong')
    }
  }

  const changeEmail = async () => {
    if (EmailSave) {
      return
    }
    const response = await fetch('http://localhost:5000/api/editemail', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: localStorage.getItem('username'),
        email: Email
      })
    })

    if (response.status == 200) {
      setEmailSave(true)
    }
    else if (response.status == 403) {
      setEmpty(true)
    }
    else if (response.status == 400) {
      setEmailExists(false)
    } else {
      alert('something went wrong')
    }
  }

  const changeDob = async () => {
    if (DobSave) {
      return
    }
    const response = await fetch('http://localhost:5000/api/editdob', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: localStorage.getItem('username'),
        dob: Dob
      })
    })

    if (response.status == 200) {
      setDobSave(true)
    }
    else if (response.status == 403) {
      setEmpty(true)
    }
    else {
      alert('something went wrong')
    }
  }


  const changeBio = async () => {
    if (BioSave) {
      return
    }
    const response = await fetch('http://localhost:5000/api/editbio', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: localStorage.getItem('username'),
        bio: Bio
      })
    })

    if (response.status == 200) {
      setBioSave(true)
    }
    else if (response.status == 403) {
      setEmpty(true)
    }
    else {
      alert('something went wrong')
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!File) {
      setEmpty(true)
      return;
    }

    const formData = new FormData();
    formData.append('file', File);
    const user = localStorage.getItem('username')
    formData.append('user', user);

    const response = await fetch('http://localhost:5000/api/editdp', {
      method: 'POST',
      body: formData,
    });

    const responsole = await response.text();
    if (response.status == 403) {
      setEmpty(true)
    }
    setDpSave(true);
  };
  return (
    <>
      <div className="h-10 px-5 py-6 ">
        <h1 className="text-xl">Edit Profile</h1>
      </div>
      <div className="px-2 mb-20">
        <form onSubmit={handleSubmit} className="w-full h-52 flex flex-col items-center justify-evenly border-2 p-5">
        
          <div className="w-28 h-28 border-2 rounded-full flex items-center justify-around relative">
            <p className="text-xs">Change <br /> Picture</p>
            <input type="file" name="dp" className="file-up" onChange={handleFileChange} />
          </div>
          <button type="submit" className={`bg-red text-sm px-5 rounded-sm ${DpSave ? 'bg-slate-400' : 'bg-red-400'}`}>Save</button>
        </form>
        {Empty ? <p className="text-center text-red-700 my-2">Field Cannot be Empty</p> : ''}
        <div className="border-2 p-5">

          <p className="text-sm">Name</p>
          <input className="border-b-2 w-full h-10 focus:outline-none mb-2" type="text" onChange={(e) => setFullName(e.target.value)} value={FullName} name="fullname" />
          <button onClick={changeName} className={`bg-red text-sm px-5 rounded-sm ${FullNameSaved ? 'bg-slate-400' : 'bg-red-400'}`}>Save</button>
        </div>

        <div className="border-2 p-5">

          <p className={`text-sm ${Warning ? 'border-red-500' : ''}`}>Username</p>
          {!UsernameExists ? <p className="text-red-400 text-sm" >Username Already Exists</p> : ''}
          <input className="border-b-2 w-full h-10 focus:outline-none mb-5" type="text" onChange={(e) => setUsername(e.target.value)} value={Username} name="username" />
          <button onClick={changeUsername} className={`bg-red text-sm px-5 rounded-sm ${UsernameSave ? 'bg-slate-400' : 'bg-red-400'}`}>Save</button>
        </div>


        <div className="border-2 p-5">

          <p className="text-sm">Bio</p>
          <textarea className="border-b-2 w-full h-20 focus:outline-none mb-5" onChange={(e) => setBio(e.target.value)} value={Bio} name="bio"></textarea>
          <button onClick={changeBio} className={`bg-red text-sm px-5 rounded-sm ${BioSave ? 'bg-slate-400' : 'bg-red-400'}`}>Save</button>
        </div>


        <div className="border-2 p-5">

          <p className="text-sm">Email</p>
          {!EmailExists ? <p className="text-red-400 text-sm">Email Already Exists</p> : ''}

          <input className="border-b-2 w-full h-10 focus:outline-none mb-5" type="email" onChange={(e) => setEmail(e.target.value)} value={Email} name="email" />
          <button onClick={changeEmail} className={`bg-red text-sm px-5 rounded-sm ${EmailSave ? 'bg-slate-400' : 'bg-red-400'}`}>Save</button>
        </div>

        <div className="border-2 p-5">
          <p className="text-sm">Date of Birth</p>
          <input className="border-2 w-full h-10 focus:outline-none mb-5" type="Date" onChange={(e) => setDob(e.target.value)} value={Dob} name="dob" />
          <button onClick={changeDob} className={`bg-red text-sm px-5 rounded-sm ${DobSave ? 'bg-slate-400' : 'bg-red-400'}`}>Save</button>
        </div>
      </div>
      <Options />
    </>
  )
}