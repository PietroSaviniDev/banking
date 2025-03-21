'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export const AuthForm = ({ type }: { type: string }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password:"",
        },

    })

    function onSubmit(values: z.infer<typeof authFormSchema>) {
        setIsLoading(true)
        console.log(values)
        setIsLoading(false)
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='mb-12 cursor-pointer items-center gap-1 flex px-4' >
                    <Image
                        src={"/icons/logo.svg"}
                        alt='logoImg'
                        width={34}
                        height={34}
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? 'Link account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }

                        <p className='text-16 font-normal text-gray-600'>
                            {user
                                ? 'Collega il tuo account per iniziare'
                                : 'Inserisci i tuoi dettagli'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user
                ? (
                    <div className='flex flex-col gap-4'>
                        {/* PLAID LINK */}
                    </div>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <CustomInput type='email' control={form.control} label={'Email'} placeholder={'inserisci la tua email'} name={'email'}/>
                                <CustomInput type='password' control={form.control} label={'Password'} placeholder={'inserisci la tua password'} name={'password'}/>
                                <div className='flex flex-col gap-4'>
                                    <Button className='form-btn' disabled={isLoading} type="submit">{
                                        isLoading ? (
                                            <>
                                                <Loader2 size={20} className='animate-spin'/> &nmsp; Attendi...
                                            </>
                                        ): type === 'sign-in'
                                            ? 'Accedi' 
                                            : 'Registrati'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <footer className='flex justify-center gap-1'>
                            <p className='text-14 font-normal text-gray-600 '>
                                {type === 'sign-in' 
                                    ? 'Non hai un account? '
                                    : 'Hai giá un account? Accedi.'
                                }
                            </p>
                            <Link className='form-link' href={ type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                                    {type === 'sign-in' ? 'Registrati.' : 'Accedi.'}
                            </Link>
                        </footer>
                    </>
                )
            }
        </section>
    )
}
