"use client";

import PrivateLayout from "@/shared/layout/private/Private";
import { TopBar } from "@/shared/components";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <PrivateLayout>
      <TopBar />
    </PrivateLayout>
  );
}
