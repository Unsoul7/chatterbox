import React from "react";
import '../style.css'

export default function PostsGrid() {
    return (
        <div className=" w-full h-auto flex flex-col items-center px-2 py-5 mb-12">
            <h1 className="py-2 border-b-2 w-full text-center">Posts</h1>
            <div className="posts-grid">
                <div className="post-card">
                    <img src="https://i.pinimg.com/736x/5c/1a/51/5c1a5108d6895c9dd0c64be9ffb1dd4f.jpg" alt="" />
                </div>
                <div className="post-card">

                    <img src="https://i.pinimg.com/564x/87/94/da/8794da4d8af68f9d493d67e294b9be92.jpg" alt="" />
                </div>
                <div className="post-card">

                    <img  src="https://i.pinimg.com/564x/eb/cf/98/ebcf980363bfc3e00ca5aa512c838b6d.jpg" alt="" />
                </div>
                <div className="post-card">

                    <img src="https://i.pinimg.com/736x/5c/1a/51/5c1a5108d6895c9dd0c64be9ffb1dd4f.jpg" alt="" />
                </div>
            </div>
        </div>
    );
}
