import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.Content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Slug transformation function
    const slugTransform = useCallback((value) => {
        if (!value) return "";
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
    }, []);

    // Auto-update slug when title changes
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [slugTransform, watch, setValue]);

    // Submit handler
    const submit = async (data) => {
        try {
            if (!userData?.$id) throw new Error("User not logged in");

            // Upload file if selected
            let fileId = post?.FeaturedImage;
            if (data.image?.[0]) {
                const file = await appwriteService.uploadFile(data.image[0]);
                fileId = file.$id;

                // Delete old file if updating
                if (post?.FeaturedImage) {
                    await appwriteService.deleteFile(post.FeaturedImage);
                }
            }

            const payload = {
                title: data.title,
                content: data.content,
                FeaturedImage: fileId,
                status: data.status,
            };

            let savedPost;
            if (post) {
                // Update existing
                savedPost = await appwriteService.updatePost(post.$id, payload);
            } else {
                // Create new
                if (!fileId) throw new Error("Featured Image is required for new post");
                savedPost = await appwriteService.createPost({
                    ...payload,
                    slug: data.slug || undefined,
                });
            }

            if (savedPost) navigate(`/post/${savedPost.$id}`);
        } catch (error) {
            console.error("Post submission error:", error);
            alert(error.message || "Failed to submit post");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap bg-slate-900 text-gray-100 p-6 rounded-xl shadow-lg"
        >
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    {...register("title", { required: true })}
                    className="mb-4 bg-slate-800 border border-slate-700 text-gray-100 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500"
                />
                <Input
                    label="Slug :"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }
                    className="mb-4 bg-slate-800 border border-slate-700 text-gray-100 placeholder-gray-400 focus:border-teal-500 focus:ring-teal-500"
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    className="bg-slate-800 border border-slate-700 text-gray-100 focus:border-teal-500 focus:ring-teal-500"
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    {...register("image", { required: !post })}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    className="mb-4 bg-slate-800 border border-slate-700 text-gray-100 file:bg-teal-700 file:text-white hover:file:bg-teal-600"
                />

                {post?.FeaturedImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.FeaturedImage)}
                            alt={post.title}
                            className="rounded-lg border border-slate-700 shadow-md"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                    className="mb-4 bg-slate-800 border border-slate-700 text-gray-100 focus:border-teal-500 focus:ring-teal-500"
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-teal-600 hover:bg-teal-500" : "bg-teal-700 hover:bg-teal-600"}
                    className="w-full text-white font-medium py-2 rounded-md transition-all"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
