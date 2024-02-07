import React, {useState} from 'react';
import * as z from "zod";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";

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
    password: z.string().min(1, "Password is required").min(8, {
        message: "Password must be at least 8 characters."
    }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    city: z.string().min(3, {
        message: "City must be at least 3 characters."
    }),
    country: z.string().min(3, {
        message: "Country must be at least 3 characters."
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const SignupForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

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
            body: JSON.stringify(values)
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-center">
                {error &&
                    <div className="error-message">{error}</div>
                }
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="text" placeholder="Name" />
                            </FormControl>
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
