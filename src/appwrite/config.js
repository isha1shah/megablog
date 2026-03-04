
import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query, Account } from "appwrite";

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

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        return this.databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            queries
        );
    }

    async createPost({ title, content, featuredImage, status, userId }) {
        return this.databases.createDocument(
            conf.databaseId,
            conf.collectionId,
            ID.unique(),
            { title, content, featuredimage: featuredImage, status, userId }
        );
    }

    async updatePost(postId, data) {
        return this.databases.updateDocument(
            conf.databaseId,
            conf.collectionId,
            postId,
            data
        );
    }

    async deletePost(postId) {
        await this.databases.deleteDocument(
            conf.databaseId,
            conf.collectionId,
            postId
        );
        return true;
    }

    async getPost(postId) {
        return this.databases.getDocument(
            conf.databaseId,
            conf.collectionId,
            postId
        );
    }

    async uploadFile(file) {
        return this.bucket.createFile(
            conf.bucketId,
            ID.unique(),
            file
        );
    }

    async deleteFile(fileId) {
        await this.bucket.deleteFile(conf.bucketId, fileId);
        return true;
    }
    debugStorage() {
        console.log('🔧 Storage Debug Info:');
        console.log('Bucket ID:', conf.bucketId);
        console.log('Project ID:', conf.appwriteProjectId);
        console.log('Endpoint:', conf.appwriteUrl);
        
        // Test if we can list files
        this.bucket.listFiles(conf.bucketId)
            .then(files => {
                console.log(' Files in bucket:', files.files);
            })
            .catch(error => {
                console.error(' Error listing files:', error);
            });
    }

getFileView(fileId) {
    if (!fileId) return null;
    return `${conf.appwriteUrl}/v1/storage/buckets/${conf.bucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
}

getFilePreview(fileId) {
    if (!fileId) return null;
    return `${conf.appwriteUrl}/v1/storage/buckets/${conf.bucketId}/files/${fileId}/preview?project=${conf.appwriteProjectId}`;
}

// Direct URL generator as backup
generateFileUrl(fileId) {
    if (!fileId) return null;
    return `https://cloud.appwrite.io/v1/storage/buckets/68d7ac8d00079ebfa0a5/files/${fileId}/view?project=${conf.appwriteProjectId}`;
}
}


const service = new Service();
export default service;