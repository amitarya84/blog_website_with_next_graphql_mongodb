import Head from 'next/head';
// import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Blog from '../components/Blog';



export default function Home({ blogs }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // const router = useRouter();

  useEffect(() => {
    setPosts(blogs)
  }, [blogs]);

  useEffect(() => {
    setLoading(true)
    let query = `
      query Query {
        blogs {
        _id,
        title,
        imageName,
        blogText
      }
    }
    `
    fetch('/api/graphql', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query
      })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setPosts(data.data.blogs)

      }).catch(err => {
        setLoading(false);
        console.log(err)
      })

  }, [])



  return (
    <div className={styles.container}>
      <Head>
        <title>Let&apos;s Blog</title>
        <meta name="description" content="Blog website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Test /> */}


      <main>
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

          {/* <div className="blog">
           { posts.map(post => <Blog key={Math.random()} blogData={post} />) }
            <OutlineButton clickHandler={fetchBtnHandler}>Fetch Posts</OutlineButton>
          </div> */}

        </div>
      </main>
    </div>
  )
}


export const getStaticProps = async () => {
  let BLOG_DATA = [];
  try {
    const client = await MongoClient.connect(
      'mongodb://localhost:27017/blogPosts'
    );

    const db = client.db();

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


  return {
    props: {
      blogs: BLOG_DATA,
    }
  }
}