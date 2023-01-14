import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.scss'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Blog from '../../components/Blog';


export default function Blogs({ blogs }) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(blogs)
    }, [blogs]);


    return (
        <div className={styles.container}>
            <Head>
                <title>Let&apos;s Blog</title>
                <meta name="description" content="Blog website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Test /> */}


            <div className="blogs">
                {(posts?.length < 1) ? <h2 className={styles.noPost}>No Posts to Read</h2> : ''}
                {
                    (posts?.length > 0) &&
                    posts.map(
                        blog => <Blog
                            key={blog._id}
                            blogData={{ _id: blog._id, title: blog.title, blogText: blog.blogText, img: blog.imageName }}
                        />
                    )
                }
                {loading && <LoadingSpinner />}

            </div>
        </div>
    )
}

export async function getServerSideProps() {

    let BLOG_DATA = [];

    if (BLOG_DATA.length < 1) {
        console.log('getting blogs')
        try {
            const client = await MongoClient.connect(
                `${process.env.MONGO_URI}`
            );

            const db = client.db('blogPosts');;

            const blogsCollection = db.collection('blogs');

            const blogs = await blogsCollection.find().toArray();

            client.close();

            blogs.forEach((obj, i) => {
                blogs[i]._id = obj._id.toString()
            });

            BLOG_DATA = blogs;

            // console.log('Blog data', BLOG_DATA)

        } catch (err) {
            console.log('Error form try catch ', err);
        }

    }else{
        console.log('we have some blogs')
    }

    return {
        props: {
            blogs: BLOG_DATA,
        }
    }
}