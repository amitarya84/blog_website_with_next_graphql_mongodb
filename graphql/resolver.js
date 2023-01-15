import { MongoClient, ObjectId } from 'mongodb';


export const resolvers = {
    Query: {
        blogs: () => getBlogs(),
        singleBlog: (_parent, _args) => getSingleBlog(_args.id)
    },
    Mutation: {
        deleteBlog: (_parent, _args) => deleteBlog(_args.id),
        addToMarked: (_parent, _args) => addToMarked(_args.id, _args.mark_as)
    }
}

async function addToMarked(id, mark_as) {
    console.log('add to marked start')

    try {
        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`
        );

        const db = client.db('blogPosts');

        const blogsCollection = db.collection('blogs');

        const blog = await blogsCollection.findOne({ _id: ObjectId(id) });

        console.log(blog)
        // client.close();


        // const db = client.db('blogPosts');

        const markedBlogsCollection = db.collection('marked_posts');

        const markedBlogExist = await markedBlogsCollection.findOne({ $and: [{ "post._id": ObjectId(id) }, { marked_as: mark_as }] })

        if (markedBlogExist === null) {

            const markedBlog = await markedBlogsCollection.insertOne({
                marked_as: mark_as,
                post: blog
            });
            // console.log(blog, markedBlog)
            client.close();

            return {
                status: true,
                message: `Added To ${mark_as} posts Succesfully!`
            };
        }

    } catch (err) {
        console.log('Error form try catch ', err);
        throw err
    }
    return {
        status: false,
        message: "Blog Already added to " + mark_as
    };
}

const getBlogs = async () => {

    try {
        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`
        );

        const db = client.db('blogPosts');

        const blogsCollection = db.collection('blogs');

        const blogs = await blogsCollection.find().toArray();

        client.close();
        return blogs;

    } catch (err) {
        console.log('Error form try catch ', err);
        throw err
    }
}


const getSingleBlog = async (id) => {

    try {
        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`
        );

        const db = client.db('blogPosts');

        const blogsCollection = db.collection('blogs');

        let o_id = new ObjectId(id);

        const blog = await blogsCollection.findOne({ _id: o_id });


        client.close();
        // console.log(blog, id)
        return blog;

    } catch (err) {
        console.log('Error form try catch ', err);
    }
}

async function deleteBlog(id) {
    try {
        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`
        );

        const db = client.db('blogPosts');

        const blogsCollection = db.collection('blogs');

        const blog = await blogsCollection.deleteOne({ _id: ObjectId(id) });

        console.log(blog)
        client.close();

        //deleting the blog from marked_blogs
        deleteMarkedBlog(id);

        return {
            status: true,
            message: "Blog Delete Succesfully!"
        };

    } catch (err) {
        console.log('Error form try catch ', err);
    }
}

async function deleteMarkedBlog(id) {
    try {
        const client = await MongoClient.connect(
            `${process.env.MONGO_URI}`
        );

        const db = client.db('blogPosts');

        const blogsCollection = db.collection('marked_posts');

        const blog = await blogsCollection.deleteMany({ "post._id": ObjectId(id) });
        // const blog = await blogsCollection.deleteOne({ "post._id": ObjectId(id) });

        console.log(blog)
        client.close();



        return {
            status: true,
            message: "Marked Blog Delete Succesfully!"
        };

    } catch (err) {
        console.log('Error form try catch ', err);
    }
}

