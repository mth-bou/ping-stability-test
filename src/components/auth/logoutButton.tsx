"use client";

import React from 'react';
import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";

const LogOutButton = () => {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({
                redirect: true,
                callbackUrl: "/"
            })}
        >
            Sign out
        </Button>
    );
};

export default LogOutButton;
