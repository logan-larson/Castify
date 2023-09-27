import { PROD } from '$env/static/private';

const isProduction = PROD === "true";

const apiURL = isProduction
  ? "http://api:4000/graphql"
  : "http://localhost:4000/graphql"
  ;

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
      //'Access-Control-Allow-Origin': 'localhost:5173',
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