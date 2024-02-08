import React, {useState} from 'react';
import * as z from "zod";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";

const signupFormSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters."
    }),
    username: z.string().min(3, {
        message: "Username must be at least 3 characters."
    }),
    email: z.string().min(5, {
        message: "Email must be at least 5 characters."
    }).email("Invalid email"),
    password: z.string().min(1, "Password is required").min(7, {
        message: "Password must be at least 7 characters."
    }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    city: z.string(),
    country: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const SignupForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            city: "",
            country: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password,
                city: values.city,
                country: values.country
            })
        });

        if (response.ok) {
            router.push("/auth/signin");
        } else {
            toast({
                title: "Error",
                description: "Oups! Registration failed. Please try again.",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-center">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="text" placeholder="Name" />
                            </FormControl>
                            <FormMessage className="text-left" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="text" placeholder="Username" />
                            </FormControl>
                            <FormMessage className="text-left" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="email" placeholder="Email" />
                            </FormControl>
                            <FormMessage className="text-left" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="password" placeholder="Password" />
                            </FormControl>
                            <FormMessage className="text-left" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="password" placeholder="Password Confirmation" />
                            </FormControl>
                            <FormMessage className="text-left" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="text" placeholder="City" />
                            </FormControl>
                            <FormMessage className="text-left" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="text" placeholder="Country" />
                            </FormControl>
                            <FormMessage className="text-left" />
                        </FormItem>
                    )}
                />
                <Button
                    className="w-20 bg-primary"
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default SignupForm;
