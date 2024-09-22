import { useState } from "react";
import { toast } from "react-toastify";
import generateTenantApi from "@/utils/request/TenantApi";

export const useCreatePost = (tenantId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const API = generateTenantApi(tenantId); 
       await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

        toast.success("Post created successfully");
      
    } catch (err) {
      console.log(err)
      setError("Failed to create post");
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
};
