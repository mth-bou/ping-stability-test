"use client";

import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";
import React from "react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/components/ui/use-toast";


interface CredentialsFormProps {
    csrfToken?: string;
}

const loginFormSchema = z.object({
    email: z.string().min(1, "Email is required").min(5, "Email must be at least 5 characters.").email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

export const CredentialsForm = (props: CredentialsFormProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {

        const signInResponse = await signIn(
            "credentials",
            {
                email: values.email,
                password: values.password,
                redirect: false,
            })

        if (signInResponse?.error) {
            toast({
                title: "Error",
                description: "Oups! Your email or password is wrong.",
                variant: "destructive"
            })
        } else {
            router.push("/");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-center">
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
                    className="w-20 bg-primary"
                    type="submit"
                >Login</Button>
            </form>
        </Form>
    )
}
