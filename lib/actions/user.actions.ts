'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ( { email, password} : signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        const response = await account.createEmailPasswordSession(email, password);
        return parseStringify(response)
    } catch (error) {
        console.log(error)
    }
}

export const signUp = async (data: SignUpParams) => {
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            data.email, 
            data.password, 
            `${data.firstName} ${data.lastName}`
        );
        
        const session = await account.createEmailPasswordSession(data.email, data.password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount)

    } catch (error) {
        console.log(error)
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      console.log('UTENTE LOGGATO')
      return parseStringify(user)

    } catch (error) {
        console.log('errore!!!', error)
      return null;
    }
  }

export const logOut = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session');
        await account.deleteSession('current');
    } catch (error) {
        return null
    }
}