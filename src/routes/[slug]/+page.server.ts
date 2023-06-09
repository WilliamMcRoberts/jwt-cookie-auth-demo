import type { PageParentData } from './$types.js';
import { findUserByUrl } from "$lib/data/userRepository";
import { error } from '@sveltejs/kit';
import { dbConn } from '$lib/dbConn.js';
import type { User, UserWithoutPassword } from '$lib/types/user.js';

export const prerender = true;

export async function load({ parent, params }) {
    const layoutData: PageParentData = await parent();
    const urlList = layoutData.URLList;
    const requestedUrl = params.slug;

    if (!urlList.includes(requestedUrl)) throw error(404, { code: 404, message: "Not Found" })

    let dbError = {
        hasError: false,
        error: ''
    }

    let noAuthUser: UserWithoutPassword;

    try {
        const collection = await dbConn();
        const tempUser = await findUserByUrl(collection, requestedUrl);
        const { password, ...userWithRemovedPassword } = tempUser;
        noAuthUser = userWithRemovedPassword;


    }
    catch (error: any) {
        dbError.hasError = true;
        dbError.error = error.message ?? 'Error Connecting to DB';
        throw error(500, { code: 500, message: "" })
    }
    return { requestedUrl, noAuthUser }
}