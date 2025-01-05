// import { PUBLIC_PROD, PUBLIC_MOBILE } from '$env/static/public';
import { CapacitorHttp } from "@capacitor/core";

const isProductionClient = PUBLIC_PROD === "true";
const isMobile = PUBLIC_MOBILE === "true"; // TODO: Switch this during CD based on the target platform. 
//const isProductionClient = false; // TEMP
//const isMobile = false; // TEMP

// Also during development because the mobile app reaches the API via your local network. So it needs the IP address of your computer.

const hostMachineIP = "10.0.2.2"; // This is the IP address of your computer on the local network.
// Have to figure out a way to serve the API over HTTPS on the local network because the mobile app requires HTTPS.

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
  console.log("clientURL", clientURL);
  return CapacitorHttp.request({
    url: clientURL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      query: query,
      variables
    }),
    webFetchExtra: {
      credentials: 'include',
    }
  })
  .then(response => {
    if (response.status != 200) {
      console.log(response);
      throw new Error(`${response.status} - ${response.headers}`);
    }
    return response.data;
  })
  .then(data => {
    if (data.errors) {
      console.log(data);
      // @ts-ignore
      throw new Error(data.errors.map(error => error.message).join('\n'));
    }
    return data.data;
  });
}