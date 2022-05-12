import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Blog {
        _id: String,
        title: String,
        imageName: String,
        blogText: String
    }

    type Login {
        username: String,
        token: String
    }

    type Query {
        blogs: [Blog]!
        singleBlog(id: String!): Blog
        login(username: String!, password: String!): Login
    }

    type Mutation {
        addBlog(title: String!, imageUrl:String!, blogText:String!): Blog!
    }
    
`;

