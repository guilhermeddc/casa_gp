import React from "react";

import { Box, Typography } from "@mui/material";
import { Modal } from "../modal/Modal";

interface IProps {
  title?: string;
  onClick(): void;
  onClose(): void;
  opened: boolean;
  loading: boolean;
  description?: React.ReactNode;
  labelSaveButton?: string;
  labelCancelButton?: string;
  children?: React.ReactNode;
}

export const ModalConfirm: React.FC<IProps> = ({
  opened,
  onClick,
  onClose,
  loading,
  children,
  labelSaveButton = "Excluir",
  labelCancelButton = "Cancelar",
  title = "Confirmação de exclusão",
  description = "Tem certeza que deseja excluir este registro?",
}) => {
  return (
    <Modal
      fullWidth
      maxWidth="xs"
      title={title}
      open={opened}
      onClick={onClick}
      onClose={onClose}
      loading={loading}
      labelCloseButton={labelCancelButton}
      labelSaveButton={labelSaveButton}
    >
      <Box marginTop={1} marginBottom={3}>
        {children ?? <Typography>{description}</Typography>}
      </Box>
    </Modal>
  );
};
