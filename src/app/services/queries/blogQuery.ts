import gql from 'graphql-tag';

export const insertBlog = gql`
    mutation insertBlog($userData: Int!, $imageData: String!,
        $categoryData: String!, $titleData: String!, $contentData: String!){
        InsertNewBlog(userID: $userData, image: $imageData,
            category:$categoryData, title: $titleData, content: $contentData) {
            id
        }
    }
`;

export const getAllBlog = gql`
    {
        AllBlog {
            category
            content
            id
            image
            title
            userID
            viewCount
        }
    }
`;

export const getBlogByID = gql`
    query getBlogByID($idData: Int!){
        BlogByID(id: $idData) {
            category
            content
            id
            image
            title
            userID
            viewCount
        }
    }
`;

export const getRecommendedBlog = gql`
    query getRecommendedBlog($idData: Int!){
        GetRecommendedBlog(id: $idData) {
            category
            content
            id
            image
            title
            userID
            viewCount
        }
    }
`;

export const deleteBlog = gql`
    mutation deleteBlog($idData: Int!) {
        DeleteBlog(id: $idData) {
            id
        }
    }
`;

export const updateBlog = gql`
    mutation($idData: Int!, $contentData:String!, $imageData: String!,
        $categoryData: String!) {
        UpdateBlog(id: $idData, content: $contentData, image: $imageData,
            category: $categoryData) {
            id
        }
    }
`;
