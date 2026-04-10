import { Client, Account, Databases, Teams } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69d689a000002e4eec10');

export const account = new Account(client);
export const databases = new Databases(client);
export const teams = new Teams(client);

export const loginWithGoogle = () => {
    account.createOAuth2Session(
        'google',
        'http://localhost:5173/', // Redirect on success
        'http://localhost:5173/login' // Redirect on failure
    );
};

export default client;
