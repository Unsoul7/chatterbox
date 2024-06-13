"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Options from "../components/Options";
import { useRouter } from "next/navigation";

export default function Uploadpost() {
    const router = useRouter();
    const [File, setFile] = useState(null);
    const [Caption, setCaption] = useState('');
    const [Empty, setEmpty] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!File) {
            setEmpty(true);
            return;
        }

        const formData = new FormData();
        const user = localStorage.getItem('username');
        formData.append('user', user);
        formData.append('file', File);
        formData.append('caption', Caption);

        // Log form data entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch('http://localhost:5000/api/uploadpost', {
                method: 'POST',
                // Do not set the Content-Type header explicitly
                body: formData,
            });

            if (response.status == 200) {
                router.push('/profile');
            } else if (response.status == 403) {
                const responsed = await response.json();
                console.log(responsed);
                setEmpty(true);
            } else {
                // Handle other statuses as needed
                console.error('Unexpected response:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="px-5 my-10 flex flex-col justify-center py-2">
                <form onSubmit={handleSubmit}>
                    <div className="w-full h-52 flex flex-col items-center justify-evenly border-2 p-5">
                        <div className="w-28 h-28 border-2 rounded-sm flex items-center justify-around relative">
                            <p className="text-xs text-center">Upload <br /> Image </p>
                            <input type="file" name="file" className="file-up" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="w-full h-60 border-2 p-5">
                        <p className="text-sm text-left">Caption</p>
                        <textarea placeholder="Enter Caption" className="border-b-2 border-t-2 w-full h-44 focus:outline-none mb-5" onChange={(e) => setCaption(e.target.value)} value={Caption} name="caption"></textarea>
                    </div>
                    <button type="submit" className="bg-red text-sm w-full h-10 px-5 rounded-md bg-red-400">Save</button>
                </form>
            </div>
            <Options />
        </>
    );
}
