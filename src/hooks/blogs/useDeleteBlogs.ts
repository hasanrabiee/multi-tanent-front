import { useState } from "react";
import { toast } from "react-toastify";
import { generateTenantApi } from "@/utils/request/TenantApi"; // Import the tenant-specific Axios instance
import { AxiosError } from "axios";

export const useDeleteBlogs = (tenantId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlog = async (postId: string) => {
    setLoading(true);
    setError(null);

    try {
      const API = generateTenantApi(tenantId); // Generate tenant-specific Axios instance
      await API.delete(`/posts/${postId}`); // Delete request to tenant-specific API endpoint
      toast.success("Post deleted successfully");
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to delete blogs");
      toast.error(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlog, loading, error };
};
