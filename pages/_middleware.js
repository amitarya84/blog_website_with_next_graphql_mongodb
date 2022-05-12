// import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

const secret = 'our_seceret';

const Middleware = (req) => {
    const { cookies } = req;

    const jwt = cookies.OursiteJwt;

    const url = req.url;

    if(url.includes('/dfs')){
        if(jwt === undefined){
            return NextResponse.redirect('/login');
        }

        try{
            // let user = verify(jwt, secret);
            // console.log(user)
            return NextResponse.next();
        }catch(err){
            return NextResponse.redirect('/login')
        }
    }
    return NextResponse.next();

}

export default Middleware;
