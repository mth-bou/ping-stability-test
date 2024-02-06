"use client";

import React from 'react';
import SignupForm from "@/components/auth/signupForm";
import {Link} from "@nextui-org/link";

const page = () => {
    return (
        <div>
            <SignupForm />
            <div className="mt-4 text-center">
                <Link href="/auth/signin" className="text-muted-foreground hover:underline">Already have account ? Sign in</Link>
            </div>
        </div>
    );
};

export default page;
