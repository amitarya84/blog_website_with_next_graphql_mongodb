import { useEffect, useContext } from 'react';
import Link from 'next/link'
import styles from './Nav.module.scss'
import axios from 'axios';
import { GloabalCtx } from '../context/gloabalCtx';
import { useRouter } from 'next/router';

const Nav = () => {

    const ctx = useContext(GloabalCtx);
    const router = useRouter();

    useEffect(() => {
        console.log('useEffect run')
        const token = localStorage.getItem('authToken');
        console.log(token)
        if (token) {
            axios.post('/api/verifyToken', { authToken: token })
                .then(res => {
                    const verified = JSON.parse(res.data).verified;
                    console.log(JSON.parse(res.data), verified)
                    if (verified) {
                        ctx.setLoggedIn(true)
                        console.log(ctx.loggedIn)
                    }else{
                        router.push('/')
                    }
                }).catch(err => {
                    console.log('error in nav', err)
                })
        }else{
            router.push('/')
        }
    }, []);

    function logoutHandler (e){
        localStorage.removeItem('authToken');
        ctx.setLoggedIn(false);
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>LET&apos;S_BLOG</div>
            <ul>
                <Link href="/">
                    <li className={router.pathname === '/' ? styles.activeNavLink : ''}>Home</li>
                </Link>

                <Link href="/blogs">
                    <li className={router.pathname === '/blogs' ? styles.activeNavLink : ''}>Blogs</li>
                </Link>

                {ctx.loggedIn && <Link href="/create-post">
                    <li className={router.pathname === '/create-post' ? styles.activeNavLink : ''}>Create+</li>
                </Link>}

                {!ctx.loggedIn && <Link href="/login">
                    <li className={router.pathname === '/login' ? styles.activeNavLink : ''}>Login</li>
                </Link>}

                {ctx.loggedIn && <li onClick={logoutHandler}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Nav;