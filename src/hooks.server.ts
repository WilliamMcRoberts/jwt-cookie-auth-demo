import { SECRET_INGREDIENT } from '$env/static/private';
import { dbConn } from '$lib/dbConn';
import { findUserByUrl } from '$lib/data/userRepository';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {

    const authToken = event.cookies.get('authToken');
    if (!authToken) {
        event.locals.authedUser = undefined;
        return await resolve(event);
    }

    const claims = jwt.verify(authToken, SECRET_INGREDIENT);
    if (!claims) {
        event.locals.authedUser = undefined;
        return await resolve(event);
    }

    if (authToken && claims) {
        const collection = await dbConn();
        const fullUser = await findUserByUrl(collection, claims.authedUser.URL);
        const { password, ...userMinusPassword } = fullUser;
        event.locals.authedUser = userMinusPassword;
    }

    return await resolve(event);
}