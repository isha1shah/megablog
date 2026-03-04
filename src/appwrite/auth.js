
import { Client, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

class AuthService {
    async getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            if (error.code === 401) return null;
            throw error;
        }
    }

    async createAccount({ email, password, name }) {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }

        const userAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        // Login after account creation
        await this.login({ email, password });
        return userAccount;
    }

    async login({ email, password }) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        await account.createEmailPasswordSession(email, password);
        return await this.getCurrentUser();
    }

    async logout() {
        await account.deleteSessions();
    }

    async isAuthenticated() {
        const user = await this.getCurrentUser();
        return user !== null;
    }
}

export default new AuthService();