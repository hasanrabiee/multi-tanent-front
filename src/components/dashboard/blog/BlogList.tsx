"use client";
import React from "react";
import { useFetchBlogs } from "@/hooks/blogs/useFetchBlogs"; // Import your custom hook
import PostsTable from "@/components/dashboard/utils/table/BlogTable";
import Cookies from "js-cookie";
import { TENANT_ID } from "@/utils/constants/constants";
import { useDeleteBlogs } from "@/hooks/blogs/useDeleteBlogs";

const BlogList: React.FC = () => {
  const {
    blogs: posts,
    loading: fetchLoading,
    error,
    refetch,
  } = useFetchBlogs(); // Use custom hook
  const { deleteBlog } = useDeleteBlogs(String(Cookies.get(TENANT_ID)));

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteBlog(postId);
      refetch();
    }
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      {fetchLoading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!fetchLoading && !error && (
        <PostsTable deletePost={handleDelete} posts={posts} />
      )}
    </div>
  );
};

export default BlogList;
