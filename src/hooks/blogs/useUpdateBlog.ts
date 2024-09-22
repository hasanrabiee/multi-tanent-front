import { useState } from 'react';
import { toast } from 'react-toastify';
import generateTenantApi from '@/utils/request/TenantApi';

export const useUpdatePost = (tenantId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePost = async (postId: string, formData: FormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const API = generateTenantApi(tenantId); // Use tenant-specific API
     await API.put(`/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
    } catch (err) {
      console.log(err)
      setError('Failed to update post');
      toast.error('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return { updatePost, loading, error };
};
