import { useState } from 'react';
import Router from 'next/router';
import styles from './CreateBlogForm.module.scss';
import axios from 'axios';


const CreateBlogForm = ({ submitHandler }) => {
    const [imagePreview, setImagePreview] = useState();
    const [title, setTitle] = useState();
    const [imageFile, setImageFile] = useState();
    const [para, setPara] = useState();

    function titleChangeHandler(e) {
        setTitle(e.target.value)
    }
    function paragraphChangeHandler(e) {
        setPara(e.target.value)
    }

    function fileInputChangeHandler(e) {
        const imgFile = e.target.files[0];
        const reader = new FileReader();
        if (imgFile) {
            setImageFile(imgFile)
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

        let formdata = new FormData();

        formdata.append('title', title);
        formdata.append('imageFile', imageFile);
        formdata.append('paragraph', para);


        // fetch('/api/addBlog', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     body: formdata
        // }).then(res => res.json())
        // .then(data => console.log(data))
        // .catch(err => console.log('Api Error:', err))

        // const res = await axios.post('/api/addBlog', {
        //     body: formdata
        // });

        // const data = await res.json();



        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event) => {
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
        };

        axios.post('/api/addBlog', formdata, config)
            .then(res => Router.push('/'+res.data._id))
            .catch(err => {
                console.log(err)
            })

    }
    return (
        <form onSubmit={submitHandler} className={styles.formControl}>
            <h2>Let's create a blog!!</h2>
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
            <button className={styles.postBlogBtn}>Post Blog</button>
        </form>
    );
}

export default CreateBlogForm;
