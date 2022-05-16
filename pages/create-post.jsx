import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';

import CreateBlogForm from '../components/CreateBlogForm';
import { GloabalCtx } from '../context/gloabalCtx';

const CreatePost = () => {
    const router = useRouter();
    const ctx = useContext(GloabalCtx);

    useEffect(() => {
        let timeout = setTimeout(() => {            
            if (!ctx.loggedIn) {
                router.push('/')
            }
        }, 500);

        return () => {
            clearTimeout(timeout);
        }
    }, [ctx.loggedIn]);

    return (
        <>
            <Head>
                <title>Create Blog - LET&apos;S BLOG</title>
            </Head>
            <CreateBlogForm />
        </>
    )
}

export default CreatePost;
