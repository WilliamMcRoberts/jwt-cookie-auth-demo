import type { Collection } from "mongodb";
import type { User, UserWithoutId, UserWithoutPassword } from "$lib/types/user";
import type { registerFormData } from "$lib/types/form";
import bcryptjs from 'bcryptjs';


export const returnAllUsers = async (collection: Collection) => {
    const Users = await collection.find().toArray();
    //console.log("Result",Users);
    return Users
}

export const returnURLsList = async (collection: Collection): Promise<string[]> => {
    const projection = { URL: 1, _id: 0 }
    const users = await collection.find().project(projection).toArray();
    const urlList: string[] = users.map((user) => user.URL)
    console.log("end")
    return urlList.sort()
}

export const returnEmailsList = async (collection: Collection): Promise<string[]> => {
    const projection = { email: 1, _id: 0 }
    const users = await collection.find().project(projection).toArray();
    const emailList: string[] = users.map((user) => user.email.toString())
    return emailList
}

export const registerUser = async (collection: Collection, user: UserWithoutId) => {
    const register = await collection.insertOne(user);
    return register
}

export const bulkAddUsers = async (collection: Collection, users: UserWithoutId[]) => {
    const register = await collection.insertMany(users);
    return register
}

export const deleteAll = async (collection: Collection) => {
    const deleteMany = await collection.deleteMany();
    return deleteMany
}

export const findUserById = async (collection: Collection) => {
    const Users = await collection.find().toArray();
    //console.log("Result",Users);
    return Users
}

export const findUserByUrl = async (collection: Collection, url: string) => {
    const User = await collection.find({ URL: url }).toArray();
    //console.log("Result",User[0]);
    return JSON.parse(JSON.stringify(User[0], (key, value) => key === "_id" ? value.toString(value) : value))
}

export const findUserByEmail = async (collection: Collection, email: string) => {
    const projection = { email: 1, firstName: 1, _id: 0 }
    const User = await collection.find({ email: email }).project(projection).toArray();
    //console.log("Email Find Result",User[0]);
    return JSON.parse(JSON.stringify(User[0], (key, value) => key === "_id" ? value.toString(value) : value))
}

export const findUserByEmailWithPassword = async (collection: Collection, email: string) => {
    const projection = { email: 1, _id: 0, password: 1, URL: 1, resetTimer: 1 }
    const User = await collection.find({ email: email }).project(projection).toArray();
    //console.log("Email Find Result",User[0]);
    return JSON.parse(JSON.stringify(User[0], (key, value) => key === "_id" ? value.toString(value) : value))
}

export const updateUserAdminOptions = async (collection: Collection, user: UserWithoutPassword) => {
    const result = await collection.findOneAndUpdate(
        { email: user.email },
        { $set: { options: user.options, palette: user.palette } },
    );
    return result
}

export const updateUserPassword = async (collection: Collection, user: User) => {
    const result = await collection.findOneAndUpdate(
        { email: user.email },
        { $set: { resetToken: undefined, password: user.password } },
    );
    return result
}

export const setResetToken = async (collection: Collection, user: UserWithoutPassword) => {
    const result = await collection.findOneAndUpdate(
        { email: user.email },
        { $set: { resetTimer: user.resetTimer } },
    );
    return result
}

export const CheckUserStyledPage = (url: string) => {
    const nonUserStyledRoutes = ['', '/', '/signup', '/login', 'resetPassword'];
    return !nonUserStyledRoutes.includes(url);
};

// fixed - password 
export const registerFormToUserWithoutId = async (form: registerFormData): Promise<UserWithoutId> => {
    const hashedPassword = await bcryptjs.hash(form.password.toString(), 12);
    const user = {
        URL: form.urlChoice as string,
        firstName: form.firstName.toString(),
        lastName: form.lastName.toString(),
        email: form.email.toString(),
        password: hashedPassword,
        resetTimer: null,
        options: {
            layout: "top",
            carousel: false,
            hero: false,
            message: ""
        },
        palette: {
            primary: "#242424",
            secondary: "#FFFFFF",
            text: "#FFFFFF"
        },
        photos: [],
    }

    return user
}