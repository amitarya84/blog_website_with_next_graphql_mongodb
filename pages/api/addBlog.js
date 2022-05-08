import nextConnect from 'next-connect';
import multer from 'multer';
import { MongoClient } from 'mongodb';

let imageName;

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      imageName = Date.now()+'-'+file.originalname;
      return cb(null, imageName)
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// apiRoute.use(upload.array('theFiles'));
apiRoute.use(upload.array('imageFile'));

apiRoute.post(async(req, res) => {
  const title = req.body.title;
  const blogText = req.body.paragraph;

  const data = {
    title: title,
    blogText: blogText,
    imageName: imageName
  }

  try {
    const client = await MongoClient.connect(
        'mongodb://localhost:27017/blogPosts'
    );

    const db = client.db();


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
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};