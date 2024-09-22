"use client";
import { useFetchBlogs } from "@/hooks/blogs/useFetchBlogs";
import { useNotificationRules } from "@/hooks/notifications/useNotification";
import { TENANT_ID } from "@/utils/constants/constants";
import { genratePostImageUrl } from "@/utils/helpers/helpers";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Blog = () => {
  const { blogs, loading, error } = useFetchBlogs();
  const { notifications } = useNotificationRules();
  useEffect(() => {
    if (notifications.length) {
      notifications.map((notifications) => toast.info(notifications.message));
    }
  }, [notifications]);
  return (
    <section className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className=" bg-white rounded-lg shadow-md">
            <figure>
              <img
                src={genratePostImageUrl(
                  String(Cookies.get(TENANT_ID)),
                  blog.image_path
                )}
                alt={blog.title || "Blog post image"}
                className="w-full h-64 object-cover rounded-t-lg mb-4"
              />
            </figure>

            <figcaption className="p-6">
              <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>
              <p className="text-gray-700">{blog.body}</p>
            </figcaption>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
