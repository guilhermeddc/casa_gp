"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/shared/lib/firebase";

interface UseAccessControlProps {
  currentArea: "admin" | "laboratory";
}

export const useAccessControl = ({ currentArea }: UseAccessControlProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // TODO: Implementar a lógica de redirecionamento para a área correta
        // router.replace("/admin");
        setLoading(false); // Se o usuário já está na área correta
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [currentArea, router]);

  return { loading };
};
