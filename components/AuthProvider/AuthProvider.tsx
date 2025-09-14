"use client";

import { checkSession, fetchUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // 1. перевірка сессії (сессія + отримання користувача) на клієнті для того, щоб мати актуальний стан аутентифікації для подальшого відображення потрібного інтерфейсу.

  const [isRefreshing, setIsrefreshing] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const asyncWrapper = async () => {
      const isActiveSession = await checkSession();
      if (isActiveSession) {
        const user = await fetchUser();
        setUser(user);
      }
      setIsrefreshing(false);
    };
    asyncWrapper();
  }, [setUser]);

  return (
    <>
      {isRefreshing && (
        <div
          style={{
            width: "100vw",
            height: "100dvh",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
          }}
        >
          PRELOADER...
        </div>
      )}
      {children}
    </>
  );
};

export default AuthProvider;
