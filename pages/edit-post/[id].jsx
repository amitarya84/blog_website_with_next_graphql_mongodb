import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';

import EditBlogForm from '../../components/EditBlogForm ';
import { GloabalCtx } from '../../context/gloabalCtx';

const EditPost = () => {
    const router = useRouter();
    const ctx = useContext(GloabalCtx);
    const [blogDataa, setBlogDataa] = useState({})

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

    useEffect(() => {
        let fetchData = async () => {
            let id = router.query.id;
            // console.log('queryID',router, id)

            let query = `
                    query Query {
                    singleBlog (id: "${id}") {
                        _id
                        title
                        imageName
                        blogText
                }
                }
                `
            const res = await fetch('/api/graphql', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: query
                })
            });
            const data = await res.json();
            setBlogDataa(data.data.singleBlog)
            // console.log('data', data)
        }
        fetchData();
        // console.log('[id] edit post')
    }, [router.query.id]) 

    return (
        <>
            <Head>
                <title>Create Blog - LET&apos;S BLOG</title>
            </Head>
            <EditBlogForm blogData={blogDataa} />
        </>
    )
}

export default EditPost;