const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

export function registerQuery() {
  return fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers like authentication tokens if needed
    },
    body: JSON.stringify({
      query: `
        mutation RegisterUser($username: String!, $email: String!, $password: String!) {
          register(username: $username, email: $email, password: $password) {
            id
            username
            email
            token
          }
        }
      `,
      variables: {
        username: "logan-larson",
        email: "logan@larson.com",
        password: "Admin123"
      }
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.errors) {
      // @ts-ignore
      throw new Error(data.errors.map(error => error.message).join('\n'));
    }
    return data.data;
  });
}

/**
 * @param {any} query
 */
export function query(query, variables = {}) {
  return fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers like authentication tokens if needed
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.errors) {
      // @ts-ignore
      throw new Error(data.errors.map(error => error.message).join('\n'));
    }
    return data.data;
  });
}