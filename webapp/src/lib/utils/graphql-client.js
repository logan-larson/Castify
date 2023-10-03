import { PUBLIC_PROD, PUBLIC_MOBILE_API_URL, PUBLIC_MOBILE } from '$env/static/public';

const isProductionClient = PUBLIC_PROD === "true";
const isMobile = PUBLIC_MOBILE === "true"; // TODO: Switch this during CD based on the target platform. 
// Also during development because the mobile app reaches the API via your local network. So it needs the IP address of your computer.

const hostMachineIP = "10.0.2.2"; // This is the IP address of your computer on the local network.

const clientURL = isProductionClient
  ? "/graphql"
  : isMobile
    ? "https://castify.social/graphql" // `http://${hostMachineIP}:4000/graphql`
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