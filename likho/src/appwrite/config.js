import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket; // our storage bucket

    // Setting up Appwrite client + services here
    // Can reuse this setup anywhere else too
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // where our API lives
            .setProject(conf.appwriteProjectId) // which project we’re working with
        
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost(title, slug, content, featuredImage, status, userId){
        try {
            return await this.databases.client.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // slug doubles as the unique ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.error("Error in Appwrite Config createPost:", error);
            throw error;
        }
    }

    // Update an existing post using its slug (ID)
    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // again, slug is the ID
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.error("Error in Appwrite Config updatePost:", error);
            throw error;
        }
    }

    // Remove a post completely from the DB
    async deletePost(slug) {
        try {
            return await this.databases.client.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error("Error in Appwrite Config deletePost:", error);
            throw error;
        }
    }

    // Get one single post by its slug (ID)
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("Error in Appwrite Config getPost:", error);
            return false;
        }
    }

    // Grab a list of posts (default only "active" ones)
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.error("Error in Appwrite Config getPosts:", error);
            return false;
        }
    }

    // Upload a file into our storage bucket
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Error in Appwrite Config uploadFile:", error);
            return false;
        }
    }

    // Delete a file from storage by its ID
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.error("Error in Appwrite Config deleteFile:", error);
            return false;
        }
    }

    // Get a file's preview by its ID
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service();

export default service;
 