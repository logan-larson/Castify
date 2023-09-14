
export const GET_USER = `
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            username
            email
        }
    }
`;

export const LOGIN_USER = `
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER_USER = `
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;