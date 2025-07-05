import axios from "axios";
import React from "react";
import { TbLogout2 } from "react-icons/tb";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
export default function Logout() {
    const [loading, setLoading] = React.useState(false);

    const handleLogout = async () => {
        setLoading(true);

        // Perform logout logic here
        try {
            const res = await axios.post("/api/user/logout")
            localStorage.removeItem("messenger");
            Cookies.remove("jwt");
            setLoading(false);
            toast.success("Logout successful");
        }
        catch (error) {
            console.error("Error during logout:", error);
            toast.error("Failed to Logouts")
        }
    }

    return (
        <>
            <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
                <div className="p-3 align-bottom">
                    <button>
                        <TbLogout2 className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300" onClick={handleLogout} />
                    </button>
                </div>
            </div>
        </>
    )
}   