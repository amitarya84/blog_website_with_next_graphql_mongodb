import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Blog {
        _id: String,
        title: String,
        imageName: String,
        blogText: String
    }

    type Query {
        blogs: [Blog]!
        singleBlog(id: String!): Blog
    }

    type Mutation {
        addBlog(title: String!, imageUrl:String!, blogText:String!): Blog!
    }
    
`;

