import React from "react";
import User from "./User";
import userGetAllusers from "../../context/userGetAllUsers.jsx";

export default function Users(){
    const [allUsers, loading] = userGetAllusers();
    return(
        <div style={{maxHeight:"calc(84vh - 5vh)"}} className="my-2 flex-ankit overflow-y-auto">
            {allUsers.filteredUsers && allUsers.filteredUsers.map((user, index) => (
                <User key={index} user={user} />
            ))} 
            
        </div>
    )
} 