import React, { useState } from 'react';
import Router from 'next/router';
import styles from './Blog.module.scss'
import OutlineButton from './UI/OutlineButton';
import LoadingSpinner from './UI/LoadingSpinner';

const Blog = ({ blogData }) => {
    const [loading, setLoading] = useState(false);

    let previewText = '';
    const previewTextAmount = 400

    if (blogData.blogText.length < previewTextAmount) {
        previewText = blogData.blogText;
    } else {
        blogData.blogText.split('').splice(0, previewTextAmount).forEach(txt => {
            previewText = previewText + txt;
        });;
        previewText = previewText + '...';
    }

    const readMoreClickHandler = () => {
        setLoading(true)
        Router.push('/' + blogData._id)
    }
    return (
        <div className={styles.blog}>
            {blogData.img ? <img className={styles.img} src={'./uploads/' + blogData.img} /> : <div className={styles.blankImg} />}
            <div>
                <h2>{blogData.title}</h2>
                <p>{previewText}</p>
                <OutlineButton clickHandler={readMoreClickHandler} >
                    {loading && <LoadingSpinner style={{transform: 'scale(0.5)', margin: '0px !important', padding: '0px !important'}} />}
                    {!loading && 'Read More..'}
                </OutlineButton>
            </div>
        </div>
    );
}

export default Blog;
