"use client";

import { Button, TopBar } from "@/shared/components";
import { profileService } from "@/shared/services";
import { Profile } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TableProfile, ModalProfile } from "./_components";
import { Add } from "@mui/icons-material";
import PrivateLayout from "@/shared/layout/private/Private";

export default function Page() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Profile | null>(null);

  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profiles"],
    queryFn: profileService.index,
  });

  const handleEdit = (item: Profile) => {
    setItemToEdit(item);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setItemToEdit(null);
    setIsAddModalOpen(false);
  };

  const handleSuccess = () => {
    setItemToEdit(null);
    setIsAddModalOpen(false);
    refetch();
  };

  return (
    <PrivateLayout>
      <TopBar />

      <div className="container mx-auto px-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Perfis</h1>
          <Button onClick={() => setIsAddModalOpen(true)} startIcon={<Add />}>
            Adicionar
          </Button>
        </div>

        <TableProfile
          items={items || []}
          onEdit={handleEdit}
          onSuccess={refetch}
          loading={isLoading}
        />
      </div>

      {!itemToEdit && (
        <ModalProfile
          openModal={isAddModalOpen}
          onClose={handleCloseAddModal}
          onSuccess={handleSuccess}
        />
      )}

      {itemToEdit && (
        <ModalProfile
          openModal={isAddModalOpen}
          onClose={handleCloseAddModal}
          onSuccess={handleSuccess}
          item={itemToEdit}
        />
      )}
    </PrivateLayout>
  );
}
