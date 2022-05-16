import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

export const SECRET_KEY = "OUR_SECRET";

export default async function (req, res) {

    console.log(req.body)

    const username = req.body.username;
    const password = req.body.password;

    try {
        const client = await MongoClient.connect('mongodb://localhost:27017/blogPosts');

        const db = client.db();

        const admins = db.collection('admins');


        const admin = await admins.findOne({
            username: username,
            password: password
        });


        client.close();
        console.log(admin)

        if(admin){
            // res.setHeader({})
            let expirationSeconds = 3600;
            const token = jwt.sign({
                adminId: admin._id.toString(),
                username: admin.username
            }, SECRET_KEY, { expiresIn: expirationSeconds })
            // res.setHeader('Set-Cookie', `authToken=${token}`)
            res.json({
                message: 'Logged in succesfully!!',
                loggedIn: true,
                authToken: token
            })
        }else{
            throw new Error('User Not Found!!')
        }

    } catch (err) {
        console.log('Error form try catch ', err);
        res.json({
            message: 'Something went wrong!!',
            loggedIn: false
        })
    }

}