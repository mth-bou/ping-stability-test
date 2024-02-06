import React from 'react';
import {getAuthSession} from "@/lib/auth";
import {notFound} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const formatInitials = (name: string) => name
    .split('_')
    .map(nom => nom[0].toUpperCase())
    .join('')

const ProfileInformations = async () => {
    const session = await getAuthSession();

    if (!session?.user) return notFound();

    return (

        <div className="flex flex-shrink-0 items-center space-x-4">
            <div className="flex flex-shrink-0 items-center space-x-4">

                <div className="flex flex-col items-end ">
                    <Avatar>
                        <AvatarImage src={session?.user.image} />
                        <AvatarFallback>{formatInitials(session?.user.name)}</AvatarFallback>
                    </Avatar>
                </div>

                {/*<div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400"></div>*/}


            </div>
        </div>
    );
};

export default ProfileInformations;
