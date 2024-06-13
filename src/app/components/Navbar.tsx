import React from "react";
import '../style.css'

export default function Navbar() {
    return (
        <nav className="nav">
            <img className="w-1/2" src="./logo.png" alt="" />
            <div className="h-full flex flex-row items-center">
                
                <span className="material-symbols-outlined">
                    notifications
                </span>
                <span className="material-symbols-outlined px-4">
                    chat
                </span>
            </div>
        </nav>
    );
}
