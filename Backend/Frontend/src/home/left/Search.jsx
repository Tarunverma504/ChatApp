import React, { useState } from "react";
import { IoSearch } from "react-icons/io5"
import useGetAllUsers from "../../context/userGetAllUsers.jsx";
import useConversation from "../../stateManage/useConversation.js";
import toast from "react-hot-toast";

export default function Search() {
    const [search, setSearch] = useState("");
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();
    const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
    return (
        <div >
            <div className="px-6 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex space-x-3">
                        <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3">
                            <input type="text" className="grow px-2 py-1.5 outline-none bg-transparent" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </label>
                        <button> <IoSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" /> </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
