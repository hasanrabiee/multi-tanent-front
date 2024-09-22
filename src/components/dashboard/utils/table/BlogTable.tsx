import React from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostsTableProps {
  posts: Post[];
  deletePost: (postId: string) => void;
}

const BlogsTable: React.FC<PostsTableProps> = ({ posts, deletePost }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Body</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {posts?.map((post) => (
            <tr
              key={post.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">{post.title}</span>
              </td>
              <td className="py-3 px-6 text-left">
                <span>{post.body}</span>
              </td>
              <td className="py-3 px-6 text-center">
                <Link
                  className="text-blue-600 hover:underline"
                  href={`/dashboard/posts/edit/${post.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogsTable;
