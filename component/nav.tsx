import styles from '@/styles/Navbar.module.css'
import { Button, TextField } from '@mui/material';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react';
import SignUp from './signup';
import Logout from './Logout';

interface Props{
    headerName: string
}

export default function Nav(props:Props){
    const router = useRouter();
    const isActiveNav = (path:string): string => {
        return (router.pathname === path) ? 'active' : 'non-active'
    }

    return(
        <div className={styles.navContainer}>
            <div className={styles.headerName}>
                {props.headerName}
            </div>
            <div>
                
                <Link href={'/'} className={`${isActiveNav('/')}`} replace>Home</Link>
                <Link href={'/events'} className={`${isActiveNav('/events')}`} replace>Events</Link>
                <Link href={'/about'} className={`${isActiveNav('/about')}`} replace>AboutUs</Link>
                
                {/* <Link href={'/user/login'} className={`${isActiveNav('/user/login')}`} replace>Login</Link> */}
                <Link href={'/user'} className={`${isActiveNav('/user')}`} replace>User Profile</Link>
                <Link href={'/products'} className={`${isActiveNav('/products')}`}>Products</Link>
                <Link href={'/quotes'} className={`${isActiveNav('/quotes')}`}>Quotes</Link>
                <Logout/>
            </div>
        </div>
    )
}