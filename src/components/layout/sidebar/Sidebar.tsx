import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isPostOpen, setIsPostOpen] = useState(false); // Handle Post sub-menu
  const [isRulesOpen, setIsRulesOpen] = useState(false); // Handle Rules sub-menu

  const pathname = usePathname();

  const togglePostMenu = () => setIsPostOpen(!isPostOpen);
  const toggleRulesMenu = () => setIsRulesOpen(!isRulesOpen);

  // Function to check if the current route matches
  const useIsActive = (path: string) => pathname === path;

  const isActivePost = useIsActive("/dashboard/posts");
  const isActivePostCreate = useIsActive("/dashboard/posts/create");
  const isActiveRulesList = useIsActive("/dashboard/rules/list");
  const isActiveRulesCreate = useIsActive("/dashboard/rules/create");

  return (
    <div className="bg-gray-800 h-screen p-4 w-64 capitalize">
      <h2 className="text-white text-2xl font-bold mb-6">Dashboard</h2>

      {/* Posts Menu */}
      <div>
        <button
          className={`w-full text-left text-white py-2 px-4 hover:bg-gray-700 focus:outline-none ${
            isActivePost || isActivePostCreate ? "bg-gray-700" : ""
          }`}
          onClick={togglePostMenu}
        >
          Blogs
        </button>
        {isPostOpen && (
          <div className="pl-4">
            <Link
              className={`w-full block text-left text-gray-300 py-2 px-4 hover:bg-gray-700 focus:outline-none ${
                isActivePost ? "bg-gray-700" : ""
              }`}
              href="/dashboard/posts/"
            >
              Blog List
            </Link>
            <Link
              className={`w-full block text-left text-gray-300 py-2 px-4 hover:bg-gray-700 focus:outline-none ${
                isActivePostCreate ? "bg-gray-700" : ""
              }`}
              href="/dashboard/posts/create"
            >
              Blog Create
            </Link>
          </div>
        )}
      </div>

      {/* Rules Menu */}
      <div className="mt-4">
        <button
          className={`w-full text-left text-white py-2 px-4 hover:bg-gray-700 focus:outline-none ${
            isActiveRulesList || isActiveRulesCreate ? "bg-gray-700" : ""
          }`}
          onClick={toggleRulesMenu}
        >
          Rules
        </button>
        {isRulesOpen && (
          <div className="pl-4">
            <Link
              className={`w-full text-left text-gray-300 py-2 px-4 hover:bg-gray-700 focus:outline-none block ${
                isActiveRulesList ? "bg-gray-700" : ""
              }`}
              href="/dashboard/rules/"
            >
              Rules List
            </Link>
            <Link
              className={`w-full text-left text-gray-300 py-2 px-4 hover:bg-gray-700 focus:outline-none block ${
                isActiveRulesCreate ? "bg-gray-700" : ""
              }`}
              href="/dashboard/rules/create"
            >
              Create
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
