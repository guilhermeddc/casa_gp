import React from "react";

import { Close } from "@mui/icons-material";
import FileCopy from "@mui/icons-material/FileCopy";
import GetApp from "@mui/icons-material/GetApp";
import Print from "@mui/icons-material/Print";
import {
  Box,
  Dialog,
  Checkbox,
  IconButton,
  Typography,
  DialogProps,
  DialogContent,
  FormControlLabel,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Button } from "../button/Button";

interface IProps extends Omit<DialogProps, "onClose" | "onClick"> {
  showAccept?: boolean;
  labelAccept?: string;
  checkAccept?: boolean;
  changeAccept?(): void;
  onClickCopy?(): void;
  onClickPrint?(): void;
  onClickDownload?(): void;
  title?: string;
  onClose?(): void;
  onClick?(): void;
  onClean?(): void;
  loading?: boolean;
  isLoadingContent?: boolean;
  disabled?: boolean;
  showActions?: boolean;
  labelCleanButton?: string;
  labelSaveButton?: string;
  labelCloseButton?: string;
  modalBlock?: boolean;
}

export const Modal: React.FC<IProps> = ({
  title,
  onClose,
  onClick,
  onClean,
  children,
  labelSaveButton,
  labelCleanButton,
  loading = false,
  isLoadingContent = false,
  disabled = false,
  labelCloseButton,
  showActions = true,
  showAccept = false,
  labelAccept,
  checkAccept = false,
  changeAccept,
  onClickCopy,
  onClickPrint,
  onClickDownload,
  modalBlock = false,
  ...props
}) => {
  return (
    <Dialog onClose={modalBlock ? undefined : onClose} {...props}>
      {title && (
        <Box
          display="flex"
          justifyContent="space-between"
          bgcolor="primary.main"
        >
          <Typography variant="h6" sx={{ p: "8px 24px" }}>
            <strong>{title}</strong>
          </Typography>

          <Box display="flex" alignItems="center" pr={2}>
            {onClickPrint && (
              <IconButton
                size="medium"
                color="primary"
                disabled={loading}
                onClick={onClickPrint}
              >
                <Print />
              </IconButton>
            )}

            {onClickDownload && (
              <IconButton
                size="medium"
                color="primary"
                disabled={loading}
                onClick={onClickDownload}
              >
                <GetApp />
              </IconButton>
            )}

            {onClickCopy && (
              <IconButton
                size="medium"
                color="primary"
                disabled={loading}
                onClick={onClickCopy}
              >
                <FileCopy />
              </IconButton>
            )}

            <IconButton
              size="medium"
              sx={{ color: "text.primary" }}
              disabled={loading}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      )}

      <Box
        component={DialogContent}
        dividers
        sx={{ p: 2 }}
        bgcolor="background.paper"
      >
        {isLoadingContent ? (
          <Stack alignItems="center" justifyContent="center">
            <CircularProgress variant="indeterminate" />
          </Stack>
        ) : (
          children
        )}
      </Box>

      {showActions && (
        <Stack
          direction={{
            xs: showAccept ? "column" : "row",
            sm: "row",
          }}
          gap={2}
          p={2}
          justifyContent={{
            xs: "flex-end",
            sm: showAccept ? "space-between" : "flex-end",
          }}
        >
          {showAccept && (
            <FormControlLabel
              label={labelAccept}
              control={
                <Checkbox
                  name="aceite"
                  checked={checkAccept}
                  onChange={changeAccept}
                />
              }
            />
          )}

          <Stack direction="row" spacing={2}>
            {labelCloseButton && (
              <Button
                onClick={onClose}
                disabled={loading}
                variant="outlined"
                label={labelCloseButton}
              />
            )}

            {labelCleanButton && (
              <Button
                onClick={onClean}
                disabled={loading}
                variant="outlined"
                label={labelCleanButton}
              />
            )}

            {labelSaveButton && (
              <Button
                onClick={onClick}
                label={labelSaveButton}
                loading={loading}
                disabled={disabled}
              />
            )}
          </Stack>
        </Stack>
      )}
    </Dialog>
  );
};
