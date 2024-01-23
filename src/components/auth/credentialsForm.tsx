"use client";

import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";


interface CredentialsFormProps {
    csrfToken?: string;
}

export const CredentialsForm = (props: CredentialsFormProps) => {
    const router = useRouter();
    const [error, setError] = useState<String | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const signInResponse = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false,
        })

        if (signInResponse && !signInResponse.error) {
            router.push("/");
        } else {
            console.log("Error : ", signInResponse);
            setError("Your email or password is wrong.");
        }
    }

    return (
        <form
            className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
            onSubmit={handleSubmit}
        >
            {error && (
                <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
                    {error}
                </span>
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
            />
            <Button
                variant="ghost"
                size="lg"
                type="submit"
            >
                Log In
            </Button>
        </form>
    )
}
