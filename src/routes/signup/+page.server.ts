import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { registerFormData } from '$lib/types/form';
import { returnURLsList, registerUser, registerFormToUserWithoutId, returnEmailsList } from "$lib/data/userRepository";
import { checkPassword } from "$lib/passwordCheck";
import { dbConn } from '$lib/dbConn';

export const prerender = false;

export const actions: Actions = {
    signup: async ({ request }: RequestEvent): Promise<registerFormData | ActionFailure<registerFormData> | Redirect> => {

        const { urlChoice, firstName, lastName, email, password } =
            Object.fromEntries(await request.formData());

        let SignUpResponse: registerFormData = {
            emailUsed: false,
            weakPassword: false,
            error: false,
            success: false,
            urlTaken: false,
            message: '',
            firstName,
            lastName,
            email,
            urlChoice,
            password: ''
        }

        const isPasswordStrong = checkPassword(password.toString());

        if (!isPasswordStrong) {
            SignUpResponse.weakPassword = true;
            SignUpResponse.error = true;
            SignUpResponse.message = "Password does not meet requirements!"
            return fail(400, SignUpResponse)
        }


        let URLList: string[] = [];
        const collection = await dbConn();

        try {
            URLList = await returnURLsList(collection)
        }
        catch (error: any) {
            SignUpResponse.hasError = true;
            SignUpResponse.message = error.message ?? 'Error Connecting to DB';
            return fail(400, SignUpResponse)
        }

        if (URLList.includes(urlChoice as string)) {
            SignUpResponse.error = true;
            SignUpResponse.message = "URL already in use!";
            SignUpResponse.urlTaken = true;

            return fail(400, SignUpResponse)
        }

        let emailList = [];

        try {
            emailList = await returnEmailsList(collection);
            if (emailList.includes(SignUpResponse.email.toString())) {
                SignUpResponse.error = true;
                SignUpResponse.emailUsed = true;
                SignUpResponse.message = "This email address has already been used!";
                return fail(400, SignUpResponse)
            }
        }
        catch (error: any) {
            SignUpResponse.error = true;
            SignUpResponse.message = "Error confirming email is available! Try again shortly!";
            return fail(400, SignUpResponse)
        }

        SignUpResponse.password = password;
        const userToInsert = await registerFormToUserWithoutId(SignUpResponse);
        const resultOfInsert = await registerUser(collection, userToInsert);
        //console.log(result)
        if (resultOfInsert.acknowledged && resultOfInsert.insertedId) throw redirect(303, `/${userToInsert.URL}`);
        SignUpResponse.password = '';
        SignUpResponse.error = true;
        SignUpResponse.message = "Error registering user!";
        return fail(503, SignUpResponse)

    },

}