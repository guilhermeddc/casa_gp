"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  FormHelperText,
  Typography,
  IconButton,
  Stack,
  Card,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { Delete, PhotoCamera } from "@mui/icons-material";
import Image from "next/image";
import { ResponsiveType } from "../../../types";

interface ImagePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  isLoading?: boolean;
  height?: ResponsiveType;
  initialImage?: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  name,
  control,
  label,
  isLoading = false,
  height = 375,
  initialImage,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value && value.length > 0) {
      const file = value[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => setPreview(reader.result as string);
    } else if (initialImage) {
      setPreview(initialImage);
    } else {
      setPreview(null);
    }
  }, [value, initialImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) onChange(files);
    else onChange(null);
  };

  const handleRemoveImage = () => {
    onChange(null);
    setPreview(null);
  };

  return (
    <Box>
      <>
        <input
          ref={ref}
          accept=".jpeg, .jpg, .png"
          name={name}
          id={name}
          onChange={handleFileChange}
          type="file"
          hidden
        />
        {label && (
          <Typography variant="subtitle1" gutterBottom>
            {label}
          </Typography>
        )}

        {isLoading ? (
          <Stack
            component={Card}
            variant="outlined"
            height={height}
            bgcolor="Background.default"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={64} />
          </Stack>
        ) : preview ? (
          <Stack
            component={Card}
            sx={{
              position: "relative",
              height: height,
              cursor: "pointer",
            }}
          >
            <CardMedia
              component="img"
              key={preview}
              src={preview || undefined}
              sx={{
                height: height,
                flex: 1,
                width: "100%",
                objectFit: "contain",
                objectPosition: "center",
                bgcolor: "primary.main",
                p: 1,
              }}
            />

            <IconButton
              title="Remover imagem"
              onClick={handleRemoveImage}
              color="secondary"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                bgcolor: "Background.default",
                transition: "0.3s",
                ":hover": {
                  opacity: 0.8,
                  bgcolor: "Background.default",
                },
              }}
            >
              <Delete />
            </IconButton>
          </Stack>
        ) : (
          <Stack
            component={Card}
            borderColor={error ? "error.main" : "black.500"}
            className="hover:border-[#ffff99]"
            variant="outlined"
            height={height}
            bgcolor="Background.default"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              flex={1}
              height={height}
            >
              <IconButton component="label" htmlFor={name} size="large">
                <PhotoCamera sx={{ fontSize: 80 }} />
              </IconButton>

              <Typography
                component="label"
                htmlFor={name}
                variant="body1"
                color="textSecondary"
                sx={{ cursor: "pointer" }}
              >
                Adicionar foto
              </Typography>
            </Stack>
          </Stack>
        )}
      </>

      {error && <FormHelperText error>{error.message}</FormHelperText>}
    </Box>
  );
};
