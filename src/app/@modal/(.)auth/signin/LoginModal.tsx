"use client";

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";

const LoginModal = ({ path } : { path: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Dialog
            open={pathname?.includes(path)}
            onOpenChange={() => {
                router.back();
            }}
        >
            <DialogContent>
                <LoginForm />
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
