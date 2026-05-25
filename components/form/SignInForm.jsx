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
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi'


const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must have 8 characters')
})


function SignInForm() {
    const { data: session } = useSession()

    var userData = session
    if (userData) {
        redirect('/home')
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

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

        if (status.error === null) {
            toast({
                title: "Login Successful",
            })
        } else {
            toast({
                title: "Incorrect email or password"
            })
        }
    }

    return (
        <div className='w-full'>
            <div className='mb-8 text-center'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4'>
                    <span className='w-1 h-1 rounded-full bg-accent animate-pulse' />
                    Welcome back
                </div>
                <h1 className='text-3xl font-bold text-gradient-white'>Sign In</h1>
                <p className='text-sm text-white/50 mt-2'>Log in to continue your set</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <HiOutlineMail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40' />
                                        <Input placeholder="you@email.com" className='pl-10' {...field} />
                                    </div>
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
                                    <div className='relative'>
                                        <HiOutlineLockClosed className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40' />
                                        <Input type="password" placeholder="••••••••" className='pl-10' {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full h-11 mt-2">
                        Sign In
                    </Button>
                </form>
            </Form>

            <div className='my-6 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow
                before:bg-white/10 after:ml-4 after:block after:h-px after:flex-grow after:bg-white/10 text-xs uppercase tracking-wider text-white/40'>
                or
            </div>

            <p className='flex flex-col text-center text-sm items-center mx-auto text-white/60'>
                <span className='mb-3'>Don&apos;t have an account?</span>
                <Link
                    className="text-white hover:text-accent border border-white/15 hover:border-accent/50 hover:bg-accent/5 px-5 py-2 rounded-full w-fit transition-all duration-300"
                    href="/sign-up"
                >
                    Create Account
                </Link>
            </p>

            <div className='mt-6 p-4 rounded-2xl glass border border-accent/15'>
                <p className='text-[10px] uppercase tracking-[0.2em] text-accent text-center mb-2'>Demo Credentials</p>
                <div className='flex flex-col gap-1 text-xs text-white/70 text-center font-mono'>
                    <span>demo@gmail.com</span>
                    <span>DemoUser@123</span>
                </div>
            </div>
        </div>
    )
}

export default SignInForm
