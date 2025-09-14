"use client";
// import { logout } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { buildLinkClassName } from "@/lib/buildLinkClassName/buildLinkClassName";

import styles from "./AuthNavigation.module.css";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const router = useRouter();

  const onLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticated) {
    return (
      <>
        <li>
          <Link
            className={buildLinkClassName({ pathname, slug: "/profile" })}
            href="/profile"
          >
            Profile
          </Link>
        </li>
        <li className={styles.userMenu}>
          <p>User Name</p>
          <button className={styles.logoutBtn} onClick={onLogout}>
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Link
          className={buildLinkClassName({ pathname, slug: "/sign-in" })}
          href="/sign-in"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className={buildLinkClassName({ pathname, slug: "/sign-up" })}
          href="/sign-up"
        >
          Sign up
        </Link>
      </li>
    </>
  );
}
