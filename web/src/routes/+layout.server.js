import jwt from 'jsonwebtoken';
import { GET_CURRENT_USER } from "$lib/queries/userQueries";
import { query } from "$lib/utils/graphql-client";
import { currentUser } from '$lib/stores/user.js';

//const JWT_SECRET = import.meta.env.JWT_SECRET;
const JWT_SECRET = "MY_SUPER_SECRET_KEY";

export async function load({ cookies }) {
    let token = cookies.get('jwt');

    if (!token) {
        return null;
    }

    let userId;

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token", decodedToken);
        userId = decodedToken.user_id;
    } catch (error) {
        console.error('JWT verification failed', error);
        return { props: { user: null } };
    }

    const user = await fetchUserDataWithUserId();

    return {
        props: {
            user
        }
    }
}

async function fetchUserDataWithUserId() {
    console.log("Fetching user data with user id");

    try {
        const response = await query(
            GET_CURRENT_USER,
        );

        console.log(response);

        const { user } = response;

        console.log(user);

        return user;
    } catch (error) {
        //console.error(error);
        return null;
    }
}