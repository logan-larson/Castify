import jwt from 'jsonwebtoken';
import { GET_CURRENT_USER } from "$lib/queries/userQueries";
import { query, serverSideQuery } from "$lib/utils/graphql-client";
import { currentUser } from '$lib/stores/user.js';

//const JWT_SECRET = import.meta.env.JWT_SECRET;
const JWT_SECRET = "MY_SUPER_SECRET_KEY";

export async function load({ cookies }) {
    let token = cookies.get('jwt');

    // This is the case when the user is not logged in
    if (!token) {
        return null;
    }

    try {
        const response = await serverSideQuery(
            GET_CURRENT_USER,
            {},
            token
        );

        const { getCurrentUser } = response;

        return {
            user: getCurrentUser
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}