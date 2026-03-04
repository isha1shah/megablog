
import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        }).catch((error) => {
            console.error('Error fetching posts:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen mt-15">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
                    <p className="text-lg text-gray-600">Browse through all our amazing content</p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Posts Available</h3>
                        <p className="text-gray-500">Check back later for new content</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-gray-600">
                                Total posts: <span className="font-semibold text-blue-600">{posts.length}</span>
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;