"use client";

import { useRouter } from "next/router";
import PrivateLayout from "../../../../../shared/layout/private/Private";
import { TopBar } from "../../../../../shared/components";

export default function Page() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <PrivateLayout>
      <TopBar />

      {id}
    </PrivateLayout>
  );
}
