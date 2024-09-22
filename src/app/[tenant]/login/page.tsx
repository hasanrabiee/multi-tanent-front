import Login from "@/components/auth/Login";
import { ROLE_KEY, TOKEN_KEY } from "@/utils/constants/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const TenantLogin = () => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(TOKEN_KEY);
  const role = cookieStore.get(ROLE_KEY);
  if (authToken) {
    if (role?.value === "admin") {
      redirect("/dashboard/");
    } else {
      redirect("/blog/");
    }
  }

  return <Login />;
};

export default TenantLogin;
