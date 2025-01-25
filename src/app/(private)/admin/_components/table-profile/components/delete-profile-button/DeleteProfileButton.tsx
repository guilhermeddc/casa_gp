import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { ModalConfirm } from "@/shared/components";
import { profileService } from "@/shared/services";
import { useMutation } from "@tanstack/react-query";
import { Tooltip } from "@mui/material";

interface DeleteCourseButtonProps {
  itemId: string;
  onSuccess: () => void;
}

export const DeleteProfileButton: React.FC<DeleteCourseButtonProps> = ({
  itemId,
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteItem = useMutation({
    mutationFn: () => profileService.destroy(itemId),
    onSuccess: () => {
      onSuccess();
    },
  });

  return (
    <>
      <Tooltip title="Excluir" arrow>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={deleteItem.isPending}
          className="bg-stone-100 p-2 rounded shadow text-sm text-stone-500 hover:text-red-500 hover:bg-stone-200 transition-all ease-in-out"
        >
          <FiTrash />
        </button>
      </Tooltip>

      <ModalConfirm
        loading={deleteItem.isPending}
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClick={deleteItem.mutate}
        title="Confirmar Exclusão"
        description="Tem certeza que deseja excluir este item?"
        labelSaveButton="Excluir"
        labelCancelButton="Cancelar"
      />
    </>
  );
};
