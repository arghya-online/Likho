import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Account } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    // Get logged-in user ID
    async getCurrentUserId() {
        try {
            const user = await this.account.get();
            return user.$id;
        } catch {
            return null;
        }
    }

    // Create a new post
    async createPost({ slug, title, content, status }) {
        const UserId = await this.getCurrentUserId();
        if (!UserId) throw new Error("User must be logged in");
        if (!content || !content.trim()) throw new Error("Content is required");

        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug || ID.unique(),
            {
                title,
                Content: content,       // Matches schema
                //FeaturedImage,
                status,
                UserId                  // Matches schema
            }
        );
    }

    // Update an existing post
    async updatePost(slug, { title, content, status }) {
        const UserId = await this.getCurrentUserId();
        if (!UserId) throw new Error("User must be logged in");
        if (!content || !content.trim()) throw new Error("Content is required");

        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                Content: content,
                //FeaturedImage,
                status,
                UserId
            }
        );
    }

    // Delete post
    async deletePost(slug) {
        return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    }

    // Get single post
    async getPost(slug) {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    }

    // Get list of posts
    async getPosts(queries = []) {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    }

    // Upload file
    async uploadFile(file) {
        const res = await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
        return res;
    }

    // Delete file
    async deleteFile(fileId) {
        return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    }

    // Get file preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;
