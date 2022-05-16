import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';

import CreateBlogForm from '../../components/CreateBlogForm';
import EditBlogForm from '../../components/EditBlogForm ';
import { GloabalCtx } from '../../context/gloabalCtx';

const EditPost = ({blogData}) => {
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
            <EditBlogForm blogData={blogData} />
        </>
    )
}

export default EditPost;


export const getServerSideProps = async (req) => {

    const id = req.query.id;
    // console.log(id)

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
    const res = await fetch('http://localhost:3000/api/graphql', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: query
        })
    });
    const data = await res.json();
    // console.log('clientside se',data)

    return {
        props: {
            blogData: data.data.singleBlog,
        }
    }
}