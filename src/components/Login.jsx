
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const signin = async (data) => {
        setError("");
        setLoading(true);
        
        try {
            const userData = await authService.login(data);
            dispatch(authLogin(userData));
            navigate("/");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
                <div className="text-center mb-4">
                    <Logo />
                    <h2 className="text-xl font-bold mt-2">Sign In</h2>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit(signin)} className="space-y-4">
                    <Input 
                        label="Email" 
                        type="email"
                        {...register("email", { required: true })}
                    />
                    
                    <Input 
                        label="Password" 
                        type="password"
                        {...register("password", { required: true })}
                    />
                    
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;