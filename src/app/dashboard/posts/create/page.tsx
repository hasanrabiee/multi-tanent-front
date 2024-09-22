"use client";
import CreateEditPost from "@/components/dashboard/blog/CreateUpdateBlog";
import { TENANT_ID } from "@/utils/constants/constants";
import Cookies from "js-cookie";

const CreatePost = () => {
  return <CreateEditPost tenantId={String(Cookies.get(TENANT_ID))} />;
};

export default CreatePost;
