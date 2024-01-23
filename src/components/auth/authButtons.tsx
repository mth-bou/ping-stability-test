"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
import { Button} from "@/components/ui/button";
import {useTransition} from "react";
import Loader from "@/components/ui/loader";

export const GoogleSignInButton = () => {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => {
        startTransition(() => {
            signIn("google");
        })
    }

    return (
        <Button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 border-2 rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            {isPending ? (
                <Loader />
            ) : (
                <>
                <FontAwesomeIcon icon={faGoogle} />
                <span className="ml-4">Continue with Google</span>
                </>
            )}
        </Button>
    );
}

export const GithubSignInButton = () => {
    const [isPending, startTransition] = useTransition();
    const handleClick = () => {
        startTransition(() => {
            signIn("github");
        })
    }

    return (
        <Button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 border-2 rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            {isPending ? (
                <Loader />
            ) : (
                <>
                <FontAwesomeIcon icon={faGithub} />
                <span className="ml-4">Continue with Github</span>
                </>
            )}
        </Button>
    );
}
