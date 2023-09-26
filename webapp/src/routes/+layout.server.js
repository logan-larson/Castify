import { GET_CURRENT_USER } from "$lib/queries/userQueries";
import { serverSideQuery } from "$lib/server/graphql-client";

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