import Head from 'next/head';
import { useContext, useState  } from 'react';
import { useRouter } from 'next/dist/client/router';

import styles from '../../styles/Home.module.scss';
import { GloabalCtx } from '../../context/gloabalCtx';
import PostOptions from '../../components/PostOptions';


const optionBtnStyles = {
    cursor: "pointer",
    position: "relative",
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
    marginLeft: "auto",
}


const Id = ({blog}) => {
    const [optionsOn, setOptionsOn] = useState(false);
    const ctx = useContext(GloabalCtx);

    const router = useRouter();

    const optionsBtnClickHandler = () => {
        setOptionsOn(prevState => !prevState);
    }

    const optionsBlurHandler = () => {
        setOptionsOn(false);
    }

    const deleteBlogHandler = () => {

        let sure = confirm('Are you sure you want to delete this blog?');

        if (sure) {
            let query = `
                mutation Mutation {
                    deleteBlog (id: "${blog._id}") {
                        status,
                        message
                    }
                }
            `;
            fetch('/api/graphql', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: query
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    // router.reload(window.location.pathname)
                })
                .catch(err => console.log(err))
        }
    }

    const addToFeaturedHandler = () => {

        let query = `
                mutation Mutation {
                    addToMarked (id: "${blog._id}", mark_as: "FEATURED") {
                        status,
                        message
                    }
                }
            `;
        fetch('/api/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: query
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let dataObj = data.data.addToMarked;
            alert(dataObj.message)

            // router.reload(window.location.pathname)
        })
        .catch(err => console.log(err))
    }

    const addToTopPostsHandler = () => {

        let query = `
                mutation Mutation {
                    addToMarked (id: "${blog._id}", mark_as: "TOP") {
                        status,
                        message
                    }
                }
            `;
        fetch('/api/graphql', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: query
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let dataObj = data.data.addToMarked;
            alert(dataObj.message)
            // router.reload(window.location.pathname)
        })
        .catch(err => console.log(err))
    }

    const editBlogHandler = () => {
        router.push('/edit-post/'+blog._id)
    }

    return (
        <>
        <Head>
            <title>{blog.title}</title>
        </Head>
        <div className={styles.blog}>
        {ctx.loggedIn && <button onBlur={optionsBlurHandler} onClick={optionsBtnClickHandler} style={{...optionBtnStyles}}>
                <span className="material-symbols-outlined">more_vert</span>
                {optionsOn && <PostOptions 
                deleteBlogHandler={deleteBlogHandler} 
                addToFeaturedHandler={addToFeaturedHandler}
                addToTopPostsHandler={addToTopPostsHandler}
                editBlogHandler={editBlogHandler}
                style={{left: 'unset', right: '20px'}}
                />}
            </button>}
            {blog.imageName && <img className={styles.image} src={'../uploads/'+blog.imageName} alt="blog image" />}
            <h1 className={styles.title}>{blog.title}</h1>
            <div className={styles.paragraph}>{blog.blogText}</div>
        </div>
        </>
    );
}

export default Id;

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
            blog: data.data.singleBlog,
        }
    }
}