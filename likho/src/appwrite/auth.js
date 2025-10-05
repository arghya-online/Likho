import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    /**
     * Create a new account and automatically login
     * @param {Object} param0 - { name, email, password }
     */
    async createAccount({ name, email, password }) {
        try {
            if (!email || !password) throw new Error('Email and password are required');

            // Create user
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name || ''
            );

            // Automatically log in after signup
            return await this.login({ email, password });
        } catch (error) {
            console.error('Error in Appwrite Service createAccount:', error);
            throw error;
        }
    }

    /**
     * Login with email & password
     * @param {Object} param0 - { email, password }
     */
    async login({ email, password }) {
        try {
            if (!email || !password) throw new Error('Email and password are required for login');
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error('Error in Appwrite Service login:', error);
            throw error;
        }
    }

    
     //Get current logged-in user
     
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error('Error in Appwrite Service getCurrentUser:', error);
            throw error;
        }
    }

    /**
     * Logout current user
     */
    async logout() {
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            console.error('Error in Appwrite Service logout:', error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
