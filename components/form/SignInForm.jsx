'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react"
import { redirect } from 'next/navigation';
import { toast } from '../ui/use-toast'


const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must have 8 characters')
})


function SignInForm() {
    const { data: session } = useSession()

    var userData = session
    if(userData) {
        redirect('/home')
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
     
    // 2. Define a submit handler.
    function onSubmit(values) {
        auth('Sign_In', values)
    }

    async function auth(provider_path, values) {

        const status = await signIn(provider_path, {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })

        if(status.error === null) {
            toast({
                title: "Login Successfull",
            })
        }else {
            toast({
                title: "Incorrect email or password"
            })
        }
    }

    return (
        <div>
            
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
            <div className='space-y-2'>
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
                />
            </div>
        
        <Button type="submit" variant="outline" className="hover:text-black" >Submit</Button>
        </form>
        </Form>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow 
        before:bg-primary after:ml-4 after:block after:h-px after:flex-grow after:bg-primary'>
            or
        </div>
        <p className='text-center text-sm mt-2'>
            If you don&apos;t have an account, please&nbsp; <br></br>
            <Link className="text-blue-500 hover:underline" href="/sign-up">Sign Up</Link>
        </p>
        </div>
    )
}

export default SignInForm