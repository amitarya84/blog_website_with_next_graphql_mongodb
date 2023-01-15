import nextConnect from 'next-connect';
// import multer from 'multer';
import { MongoClient } from 'mongodb';
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
    // console.log('errrr', req)
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
  let imgUrl;
  console.log('before try')

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
  
  const data = {
    title: title,
    blogText: blogText,
    imageName: imgUrl
  }
  
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);

    const db = client.db('blogPosts');

    const blogsCollection = db.collection('blogs');

    const result = await blogsCollection.insertOne(data);

    client.close();

    console.log('result ', result)
    // return {_id: result.insertedId};
    res.status(200).json({ _id: result.insertedId });

  } catch (err) {
    console.log('Error form try catch ', err);
  }

});

export default apiRoute;

export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
    // bodyParser: false, // Disallow body parsing, consume as stream
  },
};