
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Logo } from "../index";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const commonNavItems = [
        { name: "Home", slug: "/", icon: "🏠" },
        { name: "Blog", slug: "/all-posts", icon: "📝" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
                : "bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900"
        }`}>
            <Container>
                <nav className="flex items-center justify-between py-3">
                    <Link to="/" className="flex items-center space-x-3">
                        <Logo width={scrolled ? "50px" : "60px"} />
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        {commonNavItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.slug)}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 font-medium ${
                                    location.pathname === item.slug
                                        ? scrolled 
                                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                                            : "bg-white/20 text-white border border-white/30"
                                        : scrolled
                                        ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.name}</span>
                            </button>
                        ))}

                        {authStatus ? (
                            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                                <button
                                    onClick={() => navigate('/add-post')}
                                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 font-medium ${
                                        scrolled
                                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                                            : "bg-white text-gray-900 hover:bg-gray-100"
                                    }`}
                                >
                                    <span>✨</span>
                                    <span>Create Post</span>
                                </button>

                                <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                                    scrolled ? "bg-gray-50" : "bg-white/10"
                                }`}>
                                    <div className="w-30 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-0.5xl">
                                        {userData?.name || "User"}
                                    </div>
                                </div>
                                <LogoutBtn variant={scrolled ? "outline" : "ghost"} />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
                                <button
                                    onClick={() => navigate('/login')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        scrolled 
                                            ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50" 
                                            : "text-white hover:bg-white/10"
                                    }`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                        scrolled
                                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                                            : "bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg"
                                    }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-3 rounded-lg transition-all duration-200 ${
                            scrolled 
                                ? "text-gray-600 hover:bg-gray-100" 
                                : "text-white hover:bg-white/10"
                        }`}
                    >
                        {isMobileMenuOpen ? "✕" : "☰"}
                    </button>
                </nav>

                {isMobileMenuOpen && (
                    <div className={`md:hidden rounded-lg shadow-xl mt-2 py-3 border ${
                        scrolled ? "bg-white border-gray-200" : "bg-gray-900 border-gray-700"
                    }`}>
                        <div className="flex flex-col space-y-1">
                            {commonNavItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.slug)}
                                    className={`px-4 py-3 rounded-lg flex items-center space-x-3 mx-2 ${
                                        scrolled ? "text-gray-700 hover:bg-gray-50" : "text-white hover:bg-white/10"
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </button>
                            ))}
                            {authStatus ? (
                                <>
                                    <button
                                        onClick={() => navigate('/add-post')}
                                        className={`px-4 py-3 rounded-lg flex items-center space-x-3 mx-2 ${
                                            scrolled ? "bg-green-50 text-green-700" : "bg-green-500/20 text-green-300"
                                        }`}
                                    >
                                        <span>✨</span>
                                        <span>Create Post</span>
                                    </button>
                                    <LogoutBtn variant={scrolled ? "outline" : "ghost"} fullWidth />
                                </>
                            ) : (
                                <div className="mx-2 p-3 space-y-2 border-t border-gray-300">
                                    <button onClick={() => navigate('/login')} className="w-full text-left py-2">
                                        Login
                                    </button>
                                    <button onClick={() => navigate('/signup')} className="w-full text-left py-2">
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
};

export default Header;