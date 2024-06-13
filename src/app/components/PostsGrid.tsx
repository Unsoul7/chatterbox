import React, { useEffect, useState } from "react";
import '../style.css'

export default function PostsGrid() {
    const [userPosts, setuserPosts] = useState([])
    const fetchUserPost = async () => {
        const response = await fetch('http://localhost:5000/api/getuserposts',{
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                user : localStorage.getItem('username')
            })
        })

        const postdata = await response.json()

        setuserPosts(postdata)
        console.log(userPosts)
    }
    useEffect(() => {
        fetchUserPost()
    },[])

    return (
        <div className=" w-full h-auto flex flex-col items-center px-2 py-5 mb-12">
            <h1 className="py-2 border-b-2 w-full text-center">Posts</h1>
            <div className="posts-grid">
                {
                    userPosts.map((postd) => {
                        return (
                            <div className="post-card">
                                <img src={userPosts ? `http://localhost:5000/posts/${postd.post}` : ''} alt="" />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}
