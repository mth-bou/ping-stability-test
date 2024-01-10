import React from 'react';
import {Link} from "@nextui-org/link";
import {UserRound} from "lucide-react";

const UserProfileItem = () => {
    return (
        <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <Link href="/profile">
                <UserRound />
            </Link>
        </div>
    );
};

export default UserProfileItem;
