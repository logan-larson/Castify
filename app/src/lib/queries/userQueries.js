
export const GET_CURRENT_USER = `
  query GetCurrentUser {
      getCurrentUser {
        id
        username
        email
      }
  }
`;

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
  mutation LoginUser($loginInput: LoginInput!) {
    loginUser(loginInput: $loginInput) {
      id
      username
      email
    }
  }
`;

export const REGISTER_USER = `
  mutation RegisterUser($registerInput: RegisterInput!) {
    registerUser(registerInput: $registerInput) {
      id
      username
      email
    }
  }
`;

export const LOGOUT_USER = `
  mutation LogoutUser {
    logoutUser
  }
`;