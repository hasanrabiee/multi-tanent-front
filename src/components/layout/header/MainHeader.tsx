import { useUser } from "@/context/UserContext";

const MainHeader = () => {
  const { logout, isLoggedIn } = useUser(); // Get login state and logout function from context
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-2xl font-bold">
          <p className="text-white">
            Tenant Platform Designd And Developed By Hassan
          </p>
        </div>
        {isLoggedIn && (
          <button
            onClick={logout}
            className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
