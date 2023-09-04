
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
    loginUser(username: $username, password: $password) {
      id
      username
      email
      token
    }
  }
`;

export const REGISTER_USER = `
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      token
    }
  }
`;