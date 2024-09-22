import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TOKEN_KEY } from "@/utils/constants/constants";

// Define the context type
interface UserContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the UserContext with a default value
const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the token exists on component mount
  useEffect(() => {
    const token = Cookies.get(TOKEN_KEY);
    setIsLoggedIn(!!token); // Set login state based on token
  }, []);

  // Login function
  const login = () => {
    setIsLoggedIn(true); // Update login state
  };

  // Logout function
  const logout = () => {
    // Remove token from cookies
    Cookies.remove("token");
    setIsLoggedIn(false); // Update login state
    router.push("/");
    toast.success("Logout successful");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
