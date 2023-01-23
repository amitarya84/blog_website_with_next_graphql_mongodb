import Head from 'next/head';
// import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.scss'
import BlogCard from '../components/BlogCard';
import {
  AiOutlineRight,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft
} from 'react-icons/ai';


export default function Home({ blogsData }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // const router = useRouter();
  const topPostsRow = useRef();
  const featuredPostsRow = useRef();

  useEffect(() => {
    //converting as javascript object
    const blogPosts = JSON.parse(blogsData);

    blogPosts.forEach(blogData => {
      let post = blogData.post;
      post._id = post._id.toString();
      post['img'] = post.imageName;
    })
    setPosts((blogPosts))
    // console.log(blogPosts)
  }, [blogsData]);

  // useEffect(() => {
  //   setLoading(true);

  //   let query = `
  //     query Query {
  //       blogs {
  //       _id,
  //       title,
  //       imageName,
  //       blogText
  //     }
  //   }
  //   `;

  //   fetch('/api/graphql', {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: query
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setLoading(false);
  //       console.log('blogs data', data.data.blogs)
  //       setPosts(data.data.blogs)

  //     }).catch(err => {
  //       setLoading(false);
  //       console.log(err)
  //     })

  // }, [])

  const slideForwardTopPosts = () => {
    topPostsRow.current.scrollBy(350, 0)
  }
  const slideBackwardTopPosts = () => {
    topPostsRow.current.scrollBy(-350, 0)
  }
  const slideForwardFeaturedPosts = () => {
    featuredPostsRow.current.scrollBy(350, 0)
  }
  const slideBackwardFeaturedPosts = () => {
    featuredPostsRow.current.scrollBy(-350, 0)
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Let&apos;s Blog</title>
        <meta name="description" content="Blog website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {(posts.length > 0) ? <>
          <h1 className={styles.secHeading} style={{ textAlign: 'left' }}>Featured</h1>
          <div ref={featuredPostsRow} className={styles.row}>

            <button onClick={slideBackwardFeaturedPosts} className={`${styles.floatingBtn} ${styles.prevBtn}`}>
              <AiOutlineDoubleLeft />
            </button>

            {posts.map(post => post.marked_as === 'FEATURED' && <BlogCard key={post.post._id} blogData={post.post} />)}

            <button onClick={slideForwardFeaturedPosts} className={`${styles.floatingBtn} ${styles.forwardBtn}`}>
              <AiOutlineDoubleRight />
            </button>
          </div>
        </>
          :
          <h1 style={{ color: '#0080805e' }}>No Featured Post to show</h1>
        }

        {(posts.length > 0) ? <>
          <h1 className={styles.secHeading} style={{ textAlign: 'left' }}>Top Posts</h1>
          <div ref={topPostsRow} className={styles.row}>

            <button onClick={slideBackwardTopPosts} className={`${styles.floatingBtn} ${styles.prevBtn}`}>
              <AiOutlineDoubleLeft />
            </button>

            {posts.map(post => post.marked_as === 'TOP' && <BlogCard key={post.post._id} blogData={post.post} />)}

            <button onClick={slideForwardTopPosts} className={`${styles.floatingBtn} ${styles.forwardBtn}`}>
              <AiOutlineDoubleRight />
            </button>
          </div></>
          :
          <h1 style={{ color: '#0080805e' }}>No Top Post to show</h1>
        }
      </main>
    </div>
  )
}

export async function getStaticProps() {

  let BLOG_DATA = [];
  try {
    const client = await MongoClient.connect(
      `${process.env.MONGO_URI}`
    );

    const db = client.db('blogPosts');

    const markedPostsCollection = db.collection('marked_posts');

    const markedPosts = await markedPostsCollection.find().toArray();

    client.close();

    BLOG_DATA = markedPosts;

    // console.log(BLOG_DATA)

  } catch (err) {
    console.log('Error form try catch ', err);
  }
  return {
    props: {
      blogsData: JSON.stringify(BLOG_DATA),
    },
    revalidate: 120, //2min
  }

}