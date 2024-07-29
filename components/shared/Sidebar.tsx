'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { link } from 'fs'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const Sidebar = () => {

  const pathname = usePathname(); 

  return (
    <aside className='sidebar'>
      <div className='flex size-full flex-col gap-4'>
        <Link href='/' className='sidebar-logo'>
          <Image 
            src='/assets/images/logo-text.svg'
            alt='logo'
            width={80}
            height={28}
          />
        </Link>

        <SignedIn>
          <nav className='sidebar-nav'>
            <ul className='sidebar-nav_elements'>
              {
                navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}
                    >
                      <Link className='sidebar-link' href={link.route}>
                        <Image 
                          src={link.icon}
                          alt='logo'
                          width={28}
                          height={28}
                          className={`${isActive && 'brightness-200'}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
            <ul className='sidebar-nav_elements'>
              <li className='flex-center cursor-pointer gap-2 p-4'>
                <UserButton showName />
              </li>
              {
                navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}
                    >
                      <Link className='sidebar-link' href={link.route}>
                        <Image 
                          src={link.icon}
                          alt='logo'
                          width={28}
                          height={28}
                          className={`${isActive && 'brightness-200'}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </SignedIn>
          
        <SignedOut>
          <Button asChild className='button bg-purple-gradient bg-cover'>
            <Link href='/sign-in'>
              Login
            </Link>
          </Button>
        </SignedOut>  

      </div>
    </aside>
  )
}

export default Sidebar
