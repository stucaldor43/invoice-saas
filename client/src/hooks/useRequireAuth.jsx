import { useEffect } from "react";
import { useAuth } from "./useProvideAuth";
import { useRouter } from "./useRouter.jsx";

export function useRequireAuth(redirectUrl = "/signup") {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);
  return auth;
}
