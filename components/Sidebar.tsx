'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'

export const Sidebar = ({ user }: SiderbarProps) => {

    const pathName = usePathname();

    return (
        <section className='sidebar'>
            <nav>
                <Link href='/' className='mb-12 cursor-pointer items-center gap-2 flex' >
                    <Image src={"/icons/logo.svg"} alt='logoImg' width={34} height={34} className='size-[24px] max-xl:size-14' />
                    <h1 className='sidebar-logo'>Horizon</h1>
                </Link>

                {sidebarLinks.map((link) => {
                    const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
                        >
                            <div className='relative size-6'>
                                <Image src={link.imgURL} alt={link.label} fill className={cn({'brightness-[3] invert-0':isActive})}/>
                            </div>
                            <p className={cn('sidebar-label', {'!text-white': isActive})}>
                                {link.label}
                            </p>
                        </Link>
                    )
                })}

                User
            </nav>
            <Footer user={user}  />
        </section>
    )
}
