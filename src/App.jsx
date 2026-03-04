
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';

// Import pages
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AllPosts from './pages/AllPosts';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            } catch {
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/all-posts" element={<AllPosts />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/edit-post/:slug" element={<EditPost />} />
                    <Route path="/post/:slug" element={<Post />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
