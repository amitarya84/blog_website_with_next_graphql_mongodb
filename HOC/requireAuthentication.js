import { verify } from "jsonwebtoken";

export function requireAuthentication(gssp) {
    return async (ctx) => {
        const { req } = ctx;

        const { cookies } = req

        console.log(cookies)
        if (cookies.authToken) {
            
        } else {
            console.log('not allowed')
            return {
                redirect: {
                    permanent: false,
                    destination: '/login',
                },
            };
        }

        // if(req.headers.cookie){
        //     const { accessToken } = cookie.parse(req.headers.cookie);     

        // }

        // if (req.headers.cookie) {
        //   const { accessToken } = cookie.parse(req.headers.cookie);
        //   const client = createApolloClient(accessToken);
        //   const GET_USER = getUserQuery;

        //   try {
        //     // Send a request to the API and verify that the user exists
        //     // Reject and redirect if the user is undefined or there is no accessToken
        //     const response = await client.query({ query: GET_USER });
        //     const { getUser: user } = response.data;

        //     if (!accessToken || !user || !user.email) {
        //       return {
        //         redirect: {
        //           permanent: false,
        //           destination: '/auth',
        //         },
        //       };
        //     }
        //   } catch (error) {
        //     // Failure in the query or any error should fallback here
        //     // this route is possibly forbidden means the cookie is invalid
        //     // or the cookie is expired
        //     return {
        //       redirect: {
        //         permanent: false,
        //         destination: '/auth',
        //       },
        //     };
        //   }
        // }

        return await gssp(ctx);
    };
}