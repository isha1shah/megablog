
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, RTE, Select, Button } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (!userData) navigate('/login');
    }, [userData, navigate]);

    const submit = async (data) => {
        setLoading(true);
        
        try {
            let featuredImageId = post?.featuredimage;

            if (data.image?.[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                featuredImageId = file.$id;
            } else if (!post) {
                alert("Featured image is required!");
                setLoading(false);
                return;
            }

            const postData = {
                title: data.title,
                content: data.content,
                status: data.status,
                featuredimage: featuredImageId,
                userId: userData.$id,
            };

            if (post) {
                await appwriteService.updatePost(post.$id, postData);
            } else {
                await appwriteService.createPost(postData);
            }
            
            navigate("/");
        } catch (error) {
            alert("Error saving post: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(null);
        }
    };

    if (!userData) {
        return <div>Redirecting...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-6">
                        {post ? "Edit Post" : "Create Post"}
                    </h1>

                    <form onSubmit={handleSubmit(submit)} className="space-y-6">
                        <Input
                            label="Title"
                            placeholder="Post title"
                            {...register("title", { required: true })}
                            error={errors.title?.message}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-2">Content</label>
                            <RTE name="content" control={control} />
                        </div>

                        <Input
                            label="Featured Image"
                            type="file"
                            accept="image/*"
                            {...register("image", { required: !post })}
                            onChange={handleImageChange}
                            error={errors.image?.message}
                        />

                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded" />
                        )}

                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            {...register("status", { required: true })}
                        />

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Saving..." : (post ? "Update" : "Create")}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}