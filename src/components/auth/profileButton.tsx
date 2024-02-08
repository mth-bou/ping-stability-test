"use client";

import React from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const ProfileButton = () => {
    const router = useRouter();

    const handleProfileClick = () => {
        router.push("/profile");
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleProfileClick}
        >
            Profile
        </Button>
    );
};

export default ProfileButton;
