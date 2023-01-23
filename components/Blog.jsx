import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import styles from './Blog.module.scss'
import OutlineButton from './UI/OutlineButton';
import LoadingSpinner from './UI/LoadingSpinner';
import PostOptions from './PostOptions';
import { GloabalCtx } from '../context/gloabalCtx';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Blog = ({ blogData }) => {
    const [loading, setLoading] = useState(false);
    const [optionsOn, setOptionsOn] = useState(false);

    const router = useRouter();
    const ctx = useContext(GloabalCtx);

    const PREVIEW_TEXT_CHARACTERS = 400
    let previewText = '';

    if (blogData.blogText.length < PREVIEW_TEXT_CHARACTERS) {
        previewText = blogData.blogText;
    } else {
        blogData.blogText.split('').splice(0, PREVIEW_TEXT_CHARACTERS).forEach(txt => { previewText = previewText + txt });
        previewText = previewText + '...';
    }

    const readMoreClickHandler = () => {
        setLoading(true)
        router.push('/blogs/' + blogData._id)
    }

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
                    deleteBlog (id: "${blogData._id}") {
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
                    console.log(data.data.deleteBlog.status)
                    if (data.data.deleteBlog.status) {
                        console.log('redirecting')
                        alert('BLog Deleted Successfully!')
                        router.push('/blogs')
                    }
                    // router.reload(window.location.pathname)
                })
                .catch(err => console.log(err))
        }
    }

    const addToFeaturedHandler = () => {

        let query = `
                mutation Mutation {
                    addToMarked (id: "${blogData._id}", mark_as: "FEATURED") {
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
                    addToMarked (id: "${blogData._id}", mark_as: "TOP") {
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
        router.push('/edit-post/' + blogData._id)
    }
    return (
        <div className={styles.blog}>
            {blogData.img ? <img className={styles.img} src={blogData.img} /> : <div className={styles.blankImg} />}
            <div>
                <h2>{blogData.title}</h2>
                <p>{previewText}</p>
                {loading && <LoadingSpinner style={{ transform: 'scale(0.4)', margin: '0px !important', padding: '0px !important' }} />}
                {!loading && <OutlineButton clickHandler={readMoreClickHandler} >Read More..</OutlineButton>}
            </div>
            {ctx.loggedIn && <button onBlur={optionsBlurHandler} onClick={optionsBtnClickHandler} className={styles.post_options_btn}>
                {/* <span className="material-symbols-outlined">more_vert</span> */}
                <BsThreeDotsVertical />
                {optionsOn && <PostOptions
                    deleteBlogHandler={deleteBlogHandler}
                    addToFeaturedHandler={addToFeaturedHandler}
                    addToTopPostsHandler={addToTopPostsHandler}
                    editBlogHandler={editBlogHandler}
                />}
            </button>}
        </div>
    );
}

export default Blog;