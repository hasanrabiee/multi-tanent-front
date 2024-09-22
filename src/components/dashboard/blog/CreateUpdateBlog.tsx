import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/blogs/useCreateBlog";
import { useUpdatePost } from "@/hooks/blogs/useUpdateBlog";
import TextInput from "@/components/form/inputs/TextInput";
import TextareaInput from "@/components/form/inputs/TextAreaInput";

interface PostData {
  id?: string;
  title: string;
  body: string;
}

const CreateEditPost = ({
  tenantId,
  initialData,
}: {
  tenantId: string;
  initialData?: PostData; // Optional: if provided, this is for editing
}) => {
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [text, setText] = useState<string>(initialData?.body || "");
  const [image, setImage] = useState<File | null>(null); // State for image
  const isEditing = !!initialData?.id;
  const { createPost, loading: creating } = useCreatePost(tenantId);
  const { updatePost, loading: updating } = useUpdatePost(tenantId);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", text);
    if (image) {
      formData.append("image", image); // Append image if present
    }

    if (isEditing && initialData?.id) {
      await updatePost(initialData.id, formData);
    } else {
      await createPost(formData);
    }

    // Redirect or reset form after success
    router.push("/dashboard/posts/");
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Edit Post" : "Create a New Post"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <TextInput
          id="title"
          value={title}
          onChange={setTitle}
          required={true}
        />

        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Body
        </label>
        <TextareaInput
          id="text"
          value={text}
          onChange={setText}
          required={true}
        />

        {/* Image Input Field */}
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          accept="image/*"
        />

        <button
          type="submit"
          className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none ${
            creating || updating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={creating || updating}
        >
          {creating
            ? "Creating..."
            : updating
            ? "Updating..."
            : isEditing
            ? "Update Post"
            : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreateEditPost;
