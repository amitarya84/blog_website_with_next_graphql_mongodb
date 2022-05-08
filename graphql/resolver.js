import { MongoClient, ObjectId } from 'mongodb';
// import ObjectId from ('mongodb').ObjectId; 


const getBlogs = async () => {

    try {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017/blogPosts'
        );

        const db = client.db();

        const blogsCollection = db.collection('blogs');



        const blogs = await blogsCollection.find().toArray();

        client.close();
        return blogs;

    } catch (err) {
        console.log('Error form try catch ', err);
    }
}


const getSingleBlog = async (id) => {

    try {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017/blogPosts'
        );

        const db = client.db();

        const blogsCollection = db.collection('blogs');

        let o_id = new ObjectId(id);
        console.log('fdlkfj',o_id)

        const blog = await blogsCollection.findOne({_id: o_id});


        client.close();
        console.log(blog, id)
        return blog;

    } catch (err) {
        console.log('Error form try catch ', err);
    }
}


// const updateBlog = async (data) => {
//     console.log(data)

//     try {
//         const client = await MongoClient.connect(
//             'mongodb://localhost:27017/blogPosts'
//         );

//         const db = client.db();

//         // console.log(db)

//         const blogsCollection = db.collection('blogs');

//         // console.log('collectinssss: ', blogsCollection)

//         const result = await blogsCollection.insertOne(data);

//         client.close();
//         console.log('result ', result)
//         return {_id: result.insertedId};

//     } catch (err) {
//         console.log('Error form try catch ', err);
//     }

// }

export const resolvers = {
    Query: {
        blogs: () => getBlogs(),
        singleBlog: (_parent, _args) => getSingleBlog(_args.id)
    },
    // Mutation: {
    //     addBlog: (_parant, _args) => updateBlog(_args)
    // }
}