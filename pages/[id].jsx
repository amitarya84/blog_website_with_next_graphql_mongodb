import { useRouter } from 'next/router';
import Head from 'next/head';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import styles from '../styles/Home.module.scss';

const Id = ({blog}) => {

    const router = useRouter();

    // let paraParts = blog.blogText.split('\n');
    // let paraText = '';
    // paraParts.forEach(part => {
    //     paraText = paraText+part+'&#013;'
    // })

    return (
        <>
        <Head>
            <title>{blog.title}</title>
        </Head>
        <div className={styles.blog}>
            {blog.imageName && <img className={styles.image} src={'uploads/'+blog.imageName} alt="blog image" />}
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
    console.log('clientside se',data)

    return {
        props: {
            blog: data.data.singleBlog,
        }
    }
}