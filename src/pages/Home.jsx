
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/config';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.getPosts();
                setPosts(response.documents || []);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Improved image component with error handling
    const PostImage = ({ post }) => {
        const [imageError, setImageError] = useState(false);
        
        if (!post.featuredImage || imageError) {
            return (
                <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-xl flex items-center justify-center">
                    <span className="text-gray-500 text-4xl">📷</span>
                </div>
            );
        }

        return (
            <img 
                src={service.getFileView(post.featuredImage)} 
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
                onError={() => setImageError(true)}
                onLoad={() => console.log('Image loaded:', post.featuredImage)}
            />
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h1>
                    <p className="text-lg text-gray-600">Discover amazing stories and insights</p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm ">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
                        <p className="text-gray-500 mb-6">Be the first to share your story!</p>
                        <Link to="/add-post" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                            Create First Post
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-blue-600">{posts.length}</span> posts
                            </p>
                            <Link to="/add-post" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
                                <span className="mr-2">+</span> New Post
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div key={post.$id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-1">
                                    <PostImage post={post} />
                                    
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {post.status}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(post.$createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {post.title}
                                        </h2>
                                        
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.content?.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                        </p>
                                        
                                        <Link 
                                            to={`/post/${post.$id}`}
                                            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;