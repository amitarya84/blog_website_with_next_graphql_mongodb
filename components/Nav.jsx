import React from 'react';
import Link from 'next/link'
import styles from './Nav.module.scss'

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>LET'S_BLOG</div>
            <ul>
                <Link href='/'>
                    <li>Feed</li>
                </Link>

                <Link href='/create-post'>
                    <li>Create+</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
