export const prerender = true;


export async function load({ locals }) {
    let authedUser = undefined
    if (locals.authedUser) authedUser = locals.authedUser

    return { authedUser }

}