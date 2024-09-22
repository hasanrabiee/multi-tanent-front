import { useUser } from "@/context/UserContext";
import { TENANT_ID } from "@/utils/constants/constants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const MainHeader = () => {
  const { isLoggedIn, logout } = useUser(); // Get login state and logout function from context
  const router = useRouter();
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">
          <a href="" className="text-white">
            Tenant Platform Designd And Developed By Hassan
          </a>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push(`/${Cookies.get(TENANT_ID)}/login`)}
              className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
