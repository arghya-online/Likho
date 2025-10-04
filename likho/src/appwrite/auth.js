import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

console.log("Appwrite URL:", import.meta.env.VITE_APPWRITE_URL);
console.log("Project ID:", import.meta.env.VITE_APPWRITE_PROJECT_ID);
console.log("Database ID:", import.meta.env.VITE_DATABASE_ID);
console.log("Collection ID:", import.meta.env.VITE_APPWRITE_COLLECTION_ID);
console.log("Bucket ID:", import.meta.env.VITE_APPWRITE_BUCKET_ID);

//This part will be same for all services, even we dont use appwrite, use aything else, but still use this thing just by changing the parametres according to the backend needs
export class AuthService {
    client = new Client(); //property1
    account; //property2

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) //  API Endpoint
            .setProject(conf.appwriteProjectId) //  Project ID
        this.account = new Account(this.client);
    }

    //A method that will call all services of appwrite for authentication and user management, reusable in other files

    //This method will create a new user account
    async createAccount(email, password, name) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);

            if (userAccount){
                 //call another method
            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.error('Error in Appwrite Service createAccount:', error);
            throw error;
        }

    }

    //This method will create a new session for login
    async login({email, password}) {
        try{
            return await this.account.createEmailSession(email, password);
        }
        catch(error){
            console.error('Error in Appwrite Service login:', error);
            throw error;
        }
    }

    //This method will get the current logged in user
    async getCurrentUser() {
        try{
            return await this.account.get();
        }
        catch(error){
            console.error('Error in Appwrite Service getCurrentUser:', error);
            throw error;
        }
        return null;
    }

    //This method will log out the current user aka delete the session
    async logout(){
        try{
            return await this.account.deleteSessions('current');
        }
        catch(error){
            console.error('Error in Appwrite Service logout:', error);
            throw error;
        }
    }
}

// export a singleton instance to use across the app
const authService = new AuthService();

export default authService;