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

    type Res {
        status: Boolean,
        message: String
    }

    type Mutation {
        deleteBlog(id: String!): Res!
        addToMarked(id: String!, mark_as: String!): Res!
    }
 
`;

