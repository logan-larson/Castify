const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
  || process.env.VITE_API_ENDPOINT
  || 'http://localhost:4000/graphql'
  ;
const isProduction = import.meta.env.VITE_PROD;

const clientURL = isProduction ? "/api/graphql" : "http://localhost:4000/graphql";
const apiURL = isProduction ? "http://api:4000/graphql" : "http://localhost:4000";

/**
 * @param {any} query
 */
export function query(query, variables = {}) {
  console.log("clientURL: ", clientURL);
  return fetch(clientURL, {
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

/**
 * @param {any} query
 * @param {any} token
 */
export function serverSideQuery(query, variables = {}, token) {
  console.log("apiURL: ", apiURL);
  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `jwt=${token}`,
      'Access-Control-Allow-Origin': 'localhost:5173',
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