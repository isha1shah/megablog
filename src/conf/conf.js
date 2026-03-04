
const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  collectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

// Validate required configuration
console.log("🔧 Environment Variables:", {
  appwriteUrl: conf.appwriteUrl,
  appwriteProjectId: conf.appwriteProjectId,
  hasUrl: !!conf.appwriteUrl,
  hasProjectId: !!conf.appwriteProjectId
});

// Check if required variables are present
if (!conf.appwriteUrl) {
  throw new Error("VITE_APPWRITE_URL environment variable is required");
}

if (!conf.appwriteProjectId) {
  throw new Error("VITE_APPWRITE_PROJECT_ID environment variable is required");
}

// Validate URL format
if (!conf.appwriteUrl.startsWith('http')) {
  throw new Error(`Invalid Appwrite URL: ${conf.appwriteUrl}. Must start with http:// or https://`);
}

export default conf;