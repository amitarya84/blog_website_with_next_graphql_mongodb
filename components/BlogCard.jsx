import React, { useState } from 'react';
import Router from 'next/router';
import styles from './BlogCard.module.scss'
import OutlineButton from './UI/OutlineButton';
import LoadingSpinner from './UI/LoadingSpinner';

const Blog = ({ blogData }) => {
    const [loading, setLoading] = useState(false);

    let previewText = '';
    const previewTextAmount = 150;

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
        Router.push('/blogs/' + blogData._id)
    }

    // console.log(blogData)
    return (
        <div className={styles.blogCard}>
            {blogData.img ? <figure className={styles.img}><img src={'./uploads/' + blogData.img} /></figure> : <div className={styles.blankImg} />}
            <div>
                <h2>{blogData.title}</h2>
                <p>{previewText}</p>
                {loading && <LoadingSpinner style={{ transform: 'scale(0.4)', margin: '0px !important', padding: '0px !important' }} />}
                {!loading && <OutlineButton style={{ width: '100%'}} clickHandler={readMoreClickHandler} >Read More..</OutlineButton>}
            </div>
        </div>
    );
}

export default Blog;