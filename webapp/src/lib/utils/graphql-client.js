import { PUBLIC_PROD } from '$env/static/public';

const isProductionClient = PUBLIC_PROD === "true";
const isMobile = true; // TODO: Switch this during CD based on the target platform. 
// Also during development because the mobile app reaches the API via your local network. So it needs the IP address of your computer.

const clientURL = isProductionClient
  ? "/graphql"
  : isMobile
    ? "http://192.168.1.215:4000/graphql" // TODO: Change this to your computer's IP address.
    : "http://localhost:4000/graphql"
    ;

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