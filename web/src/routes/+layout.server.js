import jwt from 'jsonwebtoken';
//import { JWT_SECRET } from './config';
import { GET_USER } from "$lib/queries/userQueries";

const JWT_SECRET = 'MY_JWT_SECRET_FOR_NOW';


export async function load({ request }) {
    //const { yourCookieName } = request.headers.;
    const yourCookieName = "cookie";
    
    let userId;

    // Decode the JWT to get the user ID
    try {
        const decodedToken = jwt.verify(yourCookieName, JWT_SECRET);
        userId = decodedToken.userId;
    } catch (error) {
        return null;
    }

    const user = await fetchUserDataWithUserId(userId);

    return {
        props: {
            user
        }
    }
}

/**
 * @param {any} userId
 */
async function fetchUserDataWithUserId(userId) {
    const response = await fetch('/your-graphql-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: GET_USER,
            variables: { id: userId }
        })
    });

    const data = await response.json();
    return data.data.user;
}
