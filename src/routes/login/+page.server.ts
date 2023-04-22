import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { loginFormResponse } from '$lib/types/form';
import { findUserByEmailWithPassword } from '$lib/data/userRepository';
import { dbConn } from '$lib/dbConn';
import { SECRET_INGREDIENT } from '$env/static/private';
import brcyptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const prerender = false;

export async function load({ cookies }) {
    const authToken = cookies.get('authToken');
    if (!authToken) return { clearUser: true }
    return { clearUser: false }
}

export const actions: Actions = {
    login: async ({ cookies, request }: RequestEvent): Promise<loginFormResponse | ActionFailure<loginFormResponse> | Redirect> => {
        const loginFormData = await request.formData();
        const email = loginFormData.get('email')?.toString() ?? '';
        const password = loginFormData.get('password')?.toString() ?? '';

        let loginResponse = {
            email,
            error: false,
            message: ''
        }

        const collection = await dbConn();
        const userAttemptingLogin = await findUserByEmailWithPassword(collection, email);
        const authAttempt = await brcyptjs.compare(password, userAttemptingLogin.password);

        if (authAttempt) {
            const { password, ...userAttempingLoginMinusPassword } = userAttemptingLogin;
            const authToken = jwt.sign({ authedUser: userAttempingLoginMinusPassword }, SECRET_INGREDIENT, { expiresIn: '24h' });
            cookies.set('authToken', authToken, { httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict' })
            throw redirect(302, '/');
        }

        loginResponse.error = true;
        loginResponse.message = "Invalid username or password!";
        return loginResponse;
    }
}