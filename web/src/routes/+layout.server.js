import jwt from 'jsonwebtoken';
import { GET_USER } from "$lib/queries/userQueries";
import { query } from "$lib/utils/graphql-client";

const JWT_SECRET = import.meta.env.JWT_SECRET;

export async function load({ request }) {
    const cookies = request.headers.cookie;
    let token;

    if (cookies) {
        const cookieArray = cookies.split(';');
        cookieArray.forEach((cookie) => {
            const [key, value] = cookie.split('=');
            if (key.trim() === 'jwt') {
                token = value;
            }
        });
    }
    
    let userId;

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        userId = decodedToken.userId;
    } catch (error) {
        console.error('JWT verification failed', error);
        return { props: { user: null } };
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
    const response = await query(
        GET_USER,
        {
            id: userId,
        }
    );

    const { user } = response;

    return user;
}