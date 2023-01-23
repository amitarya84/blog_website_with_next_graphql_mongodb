import nextConnect from 'next-connect';
// import multer from 'multer';
import { MongoClient, ObjectId } from 'mongodb';
import cloudinary from '../../utils/cloudinary';

let imageName;

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => {
//       imageName = Date.now()+'-'+file.originalname;
//       return cb(null, imageName)
//     },
//   }),
// });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// apiRoute.use(upload.array('theFiles'));
// apiRoute.use(upload.array('imageFile'));

apiRoute.post(async (req, res) => {

  let body = JSON.parse(req.body.body);
  console.log('parsedBody', body)

  const title = body.title;
  const blogText = body.paragraph;
  const fileStr = body.imageFile;
  const id = body.id;

  let imgUrl;
  console.log('before try')

  if (fileStr) {
    try {
      console.log('in the try')
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'dev_setups',
      });
      console.log('after the uploadResponse')
      console.log(uploadResponse);
      imgUrl = uploadResponse.secure_url;
      // res.status(500).json({msg: 'SUccecful'})
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
    }

  }

  const data = {
    title: title,
    blogText: blogText,
  }

  if (imgUrl) {
    data["imageName"] = imgUrl;
    console.log(data)
  }

  // const data = {
  //   title: title,
  //   blogText: blogText,
  // }

  // const title = req.body.title;
  // const blogText = req.body.paragraph;
  // const id = req.body.id;
  // console.log(id)

  // const data = {
  //   "title": title,
  //   "blogText": blogText,
  // }

  // if (imageName) {
  //   data["imageName"] = imageName;
  //   console.log(data)
  // }

  // async function updateBlogs(){

  try {
    const client = await MongoClient.connect(
      `${process.env.MONGO_URI}`
    );

    const db = client.db('blogPosts');


    const blogsCollection = db.collection('blogs');
    const fblogsCollection = db.collection('marked_posts');

    const result = await blogsCollection.updateOne({ _id: ObjectId(id) }, { $set: data });

    // updateFeaturedAndTop();

    let updateFeaturedObj = {
      'post.title': data.title,
      'post.blogText': data.blogText,
    }

    if (imgUrl) {
      updateFeaturedObj['post.imageName'] = imgUrl;
    }

    const featuredResult = await fblogsCollection.updateMany({ "post._id": ObjectId(id) }, { $set: updateFeaturedObj })


    client.close();

    console.log('result ', result)
    console.log('Feauted ', featuredResult)
    // return {_id: result.insertedId};
    res.status(200).json({ _id: id });

  } catch (err) {
    console.log('Error form try catch ', err);
    res.status(500).json({ message: "something went wrong!" })
  }
  // }

});

export default apiRoute;

export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};