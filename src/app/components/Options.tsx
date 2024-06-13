import Link from "next/link"
import { useEffect, useState } from "react"
export default function Options() {

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
        <div className="footer">
            <div className="footer-btn">
                <Link href='/home'>
                    <span className="material-symbols-outlined">
                        home
                    </span>
                </Link>
            </div>
            <div className="footer-btn"><span className="material-symbols-outlined">
                search
            </span></div>
            <div className="footer-btn">
                <Link href={'/uploadpost'} >
                    <span className="material-symbols-outlined">
                        add_circle
                    </span>
                </Link>
            </div>
            <div className="footer-btn">
                <Link href='/profile'>
                    <div className="footer-dp-btn"><img src={`http://localhost:5000/images/${userData.dp}` ? `http://localhost:5000/images/${userData.dp}` : `${userData.dp}`} alt="" /> </div>
                </Link>
            </div>
        </div >
    )
}