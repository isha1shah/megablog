
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const create = async (data) => {
    setError("");
    setLoading(true);
    
    console.log("🔄 Signup started with:", data.email);
    
    try {
        const userData = await authService.createAccount(data);
        console.log("✅ Account created:", userData);
        
        if (userData) {
            dispatch(authLogin(userData));
            navigate("/");
        }
    } catch (err) {
        console.error("❌ Signup error:", err);
        setError(err.message || "Signup failed");
    } finally {
        console.log("🏁 Signup process finished");
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                    <Logo />
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">Create Account</h2>
                </div>

                {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="space-y-4">
                    <Input 
                        label="Full Name"
                        type="text"
                        {...register("name", { required: true })}
                    />
                    
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
                        {loading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;