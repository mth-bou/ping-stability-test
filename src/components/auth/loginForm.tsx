import React from 'react';

import { Separator } from "@/components/ui/separator"
import {GithubSignInButton, GoogleSignInButton} from "@/components/auth/authButtons";
import {CredentialsForm} from "@/components/auth/credentialsForm";


const loginForm = () => {

    return (
        <div>
            <CredentialsForm />

            <Separator className="mt-4" />

            <GithubSignInButton />
            <GoogleSignInButton />
        </div>
    );
};

export default loginForm;
