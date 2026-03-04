
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) {
                navigate("/");
                return;
            }

            try {
                const postData = await appwriteService.getPost(slug);
                setPost(postData);
            } catch (error) {
                console.error('Error fetching post:', error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await appwriteService.deletePost(post.$id);
                navigate("/");
            } catch {
                alert('Failed to delete post');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">Post not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    
                    <div className="text-gray-600 mb-6">
                        📅 {new Date(post.$createdAt).toLocaleDateString()}
                    </div>

                    {post.featuredimage && (
                        <img 
                            src={appwriteService.getFilePreview(post.featuredimage)} 
                            alt={post.title}
                            className="w-full h-64 object-cover rounded mb-6"
                        />
                    )}

                    <div className="prose max-w-none">
                        {parse(post.content)}
                    </div>

                    <div className="flex justify-between mt-8">
                        <Button onClick={() => navigate("/")}>
                            ← Back
                        </Button>
                        
                        {isAuthor && (
                            <div className="space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button>Edit</Button>
                                </Link>
                                <Button onClick={deletePost} variant="danger">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
