const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

/**
 * @param {any} query
 */
export function query(query, variables = {}) {
  return fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    credentials: 'include',
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
      throw new Error(`${response.status} - ${response.statusText}`);
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