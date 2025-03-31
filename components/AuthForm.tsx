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
import {  useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'

export const AuthForm = ({ type }: { type: string }) => {

    const [user, setUser] = useState(null);
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();
    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    })


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            //registrazione con Appwrite e creazione token plaid
            if(type === 'sign-up'){
                const newUser = await signUp(data);
                setUser(newUser);
            }

            if(type === 'sign-in'){

                const response = await signIn({
                    email: data.email, 
                    password: data.password
                })
                    
                if(response){
                    console.log('LOG IN SUCCESSFULL: ', response)

                    router.push("/")
                }
                
            }

        } catch (error) {
            console.error(error)
        }finally{
            setIsLoading(false)
        }

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
                                {type === 'sign-up' && (
                                    <>
                                        <div className='flex gap-4'>
                                            <CustomInput
                                                control={form.control}
                                                label={'Nome'}
                                                placeholder={'inserisci il tuo nome'}
                                                name={'firstName'}
                                                autocomplete='given-name'
                                                required
                                            />
                                            <CustomInput
                                                control={form.control}
                                                label={'Cognome'}
                                                placeholder={'inserisci il tuo cognome'}
                                                name={'lastName'}
                                                autocomplete='family-name'
                                                required
                                            />
                                        </div>
                                        <CustomInput
                                            control={form.control}
                                            label={'Indirizzo'}
                                            placeholder={'Indirizzo di residenza, civico'}
                                            name={'address1'}
                                            required
                                        />
                                        <CustomInput
                                            control={form.control}
                                            label={'Cittá'}
                                            placeholder={'cittá'}
                                            name={'city'}
                                            required
                                        />
                                        <div className="flex gap-4">
                                            <CustomInput
                                                control={form.control}
                                                label={'Stato / Paese'}
                                                placeholder={'ex: It'}
                                                name={'state'}
                                                //options={[{value:'1', label:'ciccio'}]}
                                                required
                                            />
                                            <CustomInput
                                                control={form.control}
                                                label={'Codeice postale'}
                                                placeholder={'ex: 02032'}
                                                name={'postalCode'}
                                                required
                                            />
                                        </div>
                                        <CustomInput
                                            control={form.control}
                                            label={'Data di nascita'}
                                            placeholder={'DD - MM - YYYY'}
                                            name={'dateOfBirth'}
                                            type='date'
                                            required
                                        />

                                        <CustomInput
                                            control={form.control}
                                            label={'Codice fiscale'}
                                            placeholder={'inserisci il tuo codice fiscale'}
                                            name={'cf'}
                                            required
                                        />

                                    </>
                                )}

                                <CustomInput
                                    type='email'
                                    control={form.control}
                                    label={'Email'}
                                    placeholder={'inserisci la tua email'}
                                    name={'email'}
                                    required={type === 'sign-up'}
                                />
                                <CustomInput
                                    type='password'
                                    control={form.control}
                                    label={'Password'}
                                    placeholder={'inserisci la tua password'}
                                    name={'password'}
                                    required={type === 'sign-up'}
                                    
                                />
                                <div className='flex flex-col gap-4'>
                                    <Button className='form-btn' disabled={isLoading} type="submit">{
                                        isLoading ? (
                                            <>
                                                <Loader2 size={20} className='animate-spin mr-2' />  Attendi...
                                            </>
                                        ) : type === 'sign-in'
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
                                    : 'Hai giá un account? '
                                }
                            </p>
                            <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                                {type === 'sign-in' ? 'Registrati.' : 'Accedi.'}
                            </Link>
                        </footer>
                    </>
                )
            }
        </section>
    )
}
