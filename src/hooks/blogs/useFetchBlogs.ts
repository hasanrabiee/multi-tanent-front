import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import generateTenantApi from "@/utils/request/TenantApi";
import Cookies from "js-cookie";
import { TENANT_ID } from "@/utils/constants/constants";

interface Blog {
  id: string;
  title: string;
  body: string;
  image_path: string;
}

export const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API = generateTenantApi(String(Cookies.get(TENANT_ID))); // Generate tenant-specific Axios instance

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get<Blog[]>("/posts"); 
      setBlogs(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blogs when the component mounts
  }, []);

  return { blogs, loading, error, refetch: fetchBlogs };
};
