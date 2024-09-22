"use client";
import CreateEditPost from "@/components/dashboard/blog/CreateUpdateBlog";
import { TENANT_ID } from "@/utils/constants/constants";
import generateTenantApi from "@/utils/request/TenantApi";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditPost = () => {
  const { postId } = useParams<{ postId: string }>();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const API = generateTenantApi(String(Cookies.get(TENANT_ID)));
      const response = await API.get(`/posts/${postId}`);
      setPost(response.data);
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <CreateEditPost
      tenantId={String(Cookies.get(TENANT_ID))}
      initialData={post}
    />
  );
};

export default EditPost;
