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
import { useRouter, redirect } from 'next/navigation';
import { toast } from '../ui/use-toast'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi'


const formSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string()
        .min(1, 'Password is required')
        .min(8, 'Password must have 8 characters')
})


function SignUpForm() {
    const { data: session } = useSession()

    var userData = session
    if (userData) {
        redirect('/home')
    }
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values) {
        auth('Sign_Up', values)
    }

    async function auth(provider_path, values) {

        const status = await signIn(provider_path, {
            redirect: false,
            username: values.username,
            email: values.email,
            password: values.password,
            callbackUrl: "/login"
        })

        if (status.error === null) {
            toast({
                title: "Account Created Successfully",
                description: "Please login to use HeyDJ"
            })
            router.push('/login');
        } else {
            toast({
                title: "An account already exists with the given email",
                description: "Please login to use HeyDJ"
            })
        }
    }


    return (
        <div className='w-full'>
            <div className='mb-8 text-center'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4'>
                    <span className='w-1 h-1 rounded-full bg-accent animate-pulse' />
                    Join the wave
                </div>
                <h1 className='text-3xl font-bold text-gradient-white'>Create Account</h1>
                <p className='text-sm text-white/50 mt-2'>Start curating with the crowd</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <div className='relative'>
                                        <HiOutlineUser className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40' />
                                        <Input placeholder="Your stage name" className='pl-10' {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        <Input type="password" placeholder="At least 8 characters" className='pl-10' {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full h-11 mt-2">
                        Create Account
                    </Button>
                </form>
            </Form>

            <div className='my-6 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow
                before:bg-white/10 after:ml-4 after:block after:h-px after:flex-grow after:bg-white/10 text-xs uppercase tracking-wider text-white/40'>
                or
            </div>

            <p className='text-center text-sm text-white/60'>
                Already have an account?{' '}
                <Link className="text-accent hover:text-accent-glow transition-colors font-medium" href="/login">
                    Sign in
                </Link>
            </p>
        </div>
    )
}

export default SignUpForm
