'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { encryptId, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "@/lib/plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource } from "./dwolla.actions";

// quality of life destructoring
const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID
} = process.env


// appwrite functions
export const signIn = async ({ email, password }: signInProps) => {
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

export const createBankAccount = async ({
    userId,
    bankId,
    accountId,
    accessToken,
    fundingSourceUrl,
    sharableId
}: createBankAccountProps) => {
    try {
        const { database } = await createAdminClient();
        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                sharableId
            }
        )

        return parseStringify(bankAccount);

    } catch (error) {
        console.error(error)
    }
}

// handshake plaid-user

export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id,
            },
            client_name: user.name,
            product: ['auth'] as Products[],
            language: 'it',
            country_codes: ['IT'] as CountryCode[]
        }

        const response = await plaidClient.linkTokenCreate(tokenParams);
        return parseStringify({ linkToken: response.data.link_token });

    } catch (error) {
        console.log(error)
    }
};

export const exchangePublicToken = async ({
    publicToken,
    user
}: exchangePublicTokenProps) => {
    try {

        // scambio public_token con access_token e item_id di plaid
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        })

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // recupero le informazioni sull account da plaid usando access_token
        const accountResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountResponse.data.accounts[0];

        // creo un processorToken per dwolla usando accessToken e accountId
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum
        };

        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        // creo una funding source URL per l'account usando customer ID di dwolla, processorToken e il nome della banca/conto
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name
        })

        if (!fundingSourceUrl) throw Error;

        // creo l account bancario usando lo user ID, item ID, account ID, accessToken, funding source URL e id sharable
        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData.account_id)

        });

        // riconvalida del path
        revalidatePath("/");

        //success message
        return parseStringify({
            publicTokenExchange: "success"
        })

    } catch (error) {
        console.log('errore durante il processo di exchange dei token', error)
    }
}