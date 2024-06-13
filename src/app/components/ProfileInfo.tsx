import React, { useState, useEffect } from "react";
import '../style.css'

export default function ProfileInfo() {

    const [userData, setUserData] = useState([])

    const fetchUser = async () => {

        try {
            const user = await fetch('http://localhost:5000/api/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: localStorage.getItem('username')
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
    }, [])

    return (
        <div className="w-full h-32 flex flex-row items-center justify-around px-2">
            <div className="dp-img"><img className='w-full' src={`${userData.dp}` ? `http://localhost:5000/images/${userData.dp}` : `https://i.pinimg.com/564x/29/b8/d2/29b8d250380266eb04be05fe21ef19a7.jpg` } alt="" /></div>
            <div className="flex flex-col items-center"><h1 className="text-lg">{userData.posts ? userData.posts.length : '0'}</h1><p className="text-sm">Posts</p></div>
            <div className="flex flex-col items-center"><h1 className="text-lg">200</h1><p className="text-sm">Followers</p></div>
            <div className="flex flex-col items-center" ><h1 className="text-lg">18</h1><p className="text-sm">Following</p></div>
        </div>
    );
}
