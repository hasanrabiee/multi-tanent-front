import { TOKEN_KEY } from "@/utils/constants/constants";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useLogout = (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const router = useRouter();

  const logout = () => {
    // Remove the token from cookies
    Cookies.remove(TOKEN_KEY);
    setIsLoggedIn(false);
    
    // Redirect the user to the login page
    router.push("/");
  };

  return { logout };
};
