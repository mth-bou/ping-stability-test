import React from 'react';

import { Separator } from "@/components/ui/separator"
import {GithubSignInButton, GoogleSignInButton} from "@/components/auth/authButtons";
import {CredentialsForm} from "@/components/auth/credentialsForm";
import {Link} from "@nextui-org/link";


const loginForm = () => {

    return (
        <div>
            <CredentialsForm />

            <Separator className="mt-4" />

            <GithubSignInButton />
            <GoogleSignInButton />

            <div className="mt-4 text-center">
                <Link href="/auth/signup" className="text-accent">Don't have account ? Create one</Link>
            </div>
        </div>
    );
};

export default loginForm;
