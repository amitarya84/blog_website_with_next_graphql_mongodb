import styles from './PostOptions.module.scss';

const PostOptions = ({ editBlogHandler, deleteBlogHandler, addToFeaturedHandler, addToTopPostsHandler, style }) => {
    function clickHandler(e) {
        e.stopPropagation();
    }
    return (
        <div style={style} className={styles.optionsBox}>
            <ul onClick={clickHandler} name="blog_post_options" id="blog_post_options">
                <li onClick={editBlogHandler}>Edit&nbsp;blog</li>
                <li onClick={deleteBlogHandler}>Delete&nbsp;blog</li>
                <li onClick={addToFeaturedHandler}>Add&nbsp;to&nbsp;Featured</li>
                <li onClick={addToTopPostsHandler}>Add&nbsp;to&nbsp;Top&nbsp;Posts</li>
            </ul>
        </div>
    );
}

export default PostOptions;
