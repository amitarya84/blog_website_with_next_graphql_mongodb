import { verify } from "jsonwebtoken";
import { SECRET_KEY } from './login';

export default function varifyToken(req, res) {
    try{
      verify(req.body.authToken, SECRET_KEY)
      res.json(JSON.stringify({
        verified: true
      }))
    }catch(err) {
      console.log('yoyo',err)
      res.json(JSON.stringify({
        verified: false,
        message: err.message}))
    }
}

export const config = {
    api: {
      bodyParser: true, // Disallow body parsing, consume as stream
    },
  };