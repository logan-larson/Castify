
export const GetUser = `
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            username
            email
        }
    }
`;