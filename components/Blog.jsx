import React from 'react';
import Router from 'next/router';
import styles from './Blog.module.scss'
import OutlineButton from './UI/OutlineButton';

const Blog = ({ blogData }) => {
    let previewText = '';
    const previewTextAmount = 400

    if(blogData.blogText.length < previewTextAmount){
        previewText = blogData.blogText;
    }else{
        blogData.blogText.split('').splice(0, previewTextAmount).forEach(txt => {
            previewText = previewText+txt;
        });;
        previewText = previewText+ '...';
    }

    const readMoreClickHandler = () => {
        Router.push('/'+blogData._id)
    }
    return (
        <div className={styles.blog}>
            {blogData.img ? <img className={styles.img} src={'./uploads/' + blogData.img} /> : <div className={styles.blankImg} />}
            <div>
                <h2>{blogData.title}</h2>
                <p>{previewText}</p>
                <OutlineButton clickHandler={readMoreClickHandler} >Read More..</OutlineButton>
            </div>
        </div>
    );
}

export default Blog;
