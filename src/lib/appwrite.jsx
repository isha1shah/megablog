import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68b57f900003785d2827');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };
export default client;