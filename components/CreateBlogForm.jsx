import { useState } from 'react';
import Router from 'next/router';
import FormData from 'form-data';

import styles from './CreateBlogForm.module.scss';
import axios from 'axios';


const CreateBlogForm = ({ submitHandler }) => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState();
    const [para, setPara] = useState('');

    function titleChangeHandler(e) {
        setTitle(e.target.value)
    }
    function paragraphChangeHandler(e) {
        setPara(e.target.value)
    }

    function fileInputChangeHandler(e) {

        const imgFile = e.target.files[0];

        if (imgFile) {
            setImageFile(imgFile)
            const reader = new FileReader();
            reader.readAsDataURL(imgFile)
            reader.onload = e => { setImagePreview(e.target.result) }
            reader.onerror = err => setImagePreview('')
        } else {
            setImagePreview()
        }
    }


    function submitHandler(e) {
        e.preventDefault();
        // console.log(title)
        // console.log(imageFile)
        // console.log(para)

        let validated = (title.trim() && para.trim());

        if (validated) {
            setLoading(true)

            // let formdata = new FormData();

            // formdata.append("title", title);
            // formdata.append("imageFile", imageFile);
            // formdata.append("paragraph", para);

            // const config = {
            //     headers: { "content-type": "multipart/form-data" },
            //     onUploadProgress: (event) => {
            //         console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            //     },
            // };

            let formdata = JSON.stringify({
                title: title,
                paragraph: para,
                imageFile: imagePreview
            })
            const config = {
                headers: { "Content-Type": "application/json" },
                body: formdata,
                onUploadProgress: (event) => {
                    console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
                },
            };


            axios.post('/api/addBlog', config)
                .then(res => {
                    setLoading(false)
                    Router.push(`/blogs/${res.data._id}`)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })

            // axios.post('/api/addBlog', formdata, config)
            //     .then(res => {
            //         setLoading(false)
            //         Router.push(`/blogs/${res.data._id}`)
            //     })
            //     .catch(err => {
            //         setLoading(false)
            //         console.log(err)
            //     })
        } else {
            alert('Please fill the form first!')
        }

    }
    
    return (
        <form onSubmit={submitHandler} className={styles.formControl}>
            <h2>Let&apos;s create a blog!!</h2>
            <label >
                <input onChange={titleChangeHandler} type="text" placeholder='Enter Blog Title..' />
            </label>
            <div className={styles.outline}>

                <label >
                    Choose an image file:
                    <input type="file" onChange={fileInputChangeHandler} />
                    {imagePreview && <figure><img className={styles.previewImage} src={imagePreview} alt="blog image preview" /></figure>}
                </label>
            </div>
            <label >
                <textarea onChange={paragraphChangeHandler} name="blog-paragraph" id="blogPara" cols="30" rows="10" placeholder='Enter Paragraph..'></textarea>
            </label>
            <br /><br />
            <button className={styles.postBlogBtn} style={loading ? { backgroundColor: 'gray' } : {}}>Post Blog</button>
        </form>
    );
}

export default CreateBlogForm;
