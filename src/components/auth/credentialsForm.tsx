"use client";

import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


interface CredentialsFormProps {
    csrfToken?: string;
}

const loginFormSchema = z.object({
    email: z.string().min(5, {
        message: "Email must be at least 5 characters."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    })
});

export const CredentialsForm = (props: CredentialsFormProps) => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {

        const signInResponse = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if (signInResponse?.error) {
            console.log("Error : ", signInResponse);
            setError("Your email or password is wrong.");
        } else {
            router.push("/");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-center">
                {error &&
                    <div className="error-message">{error}</div>
                }
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-20 bg-primary hover:bg-primary/80"
                    type="submit"
                >Login</Button>
            </form>
        </Form>
    )
}
