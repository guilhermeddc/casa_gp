"use client";

import {
  Button,
  ImagePicker,
  Modal,
  RichText,
  TextField,
} from "@/shared/components";
import { Profile } from "@/shared/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "./validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid2, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { profileService } from "@/shared/services";

interface IProps {
  openModal: boolean;
  onClose: () => void;
  onSuccess: () => void;
  item?: Profile | null;
}

export const ModalProfile: React.FC<IProps> = ({
  openModal,
  onClose,
  onSuccess,
  item,
}) => {
  const isEditMode = useMemo(() => !!item, [item]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema(isEditMode)),
  });

  useEffect(() => {
    reset({
      image: item?.image,
      name: item?.name || "",
      slug: item?.slug || "",
      age: item?.age || "",
      feet: item?.feet || "",
      height: item?.height || "",
      weight: item?.weight || "",
      naturalness: item?.naturalness || "",
      description: item?.description || "",
    });
  }, [item, reset]);

  const storeProfile = useMutation({
    mutationKey: ["store-profile"],
    mutationFn: (payload: Partial<Profile> & { imageFile: File }) =>
      profileService.store(payload),
    onSuccess: () => {
      reset();
      onSuccess();
    },
  });

  const updateProfile = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (payload: Partial<Profile>) => profileService.update(payload),
    onSuccess: () => {
      reset();
      onSuccess();
    },
  });

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (!values.image && !isEditMode) return;

      if (isEditMode) {
        const payload: Partial<Profile> & { imageFile: File | null } = {
          ...values,
          imageFile: values.image[0] || null,
        };

        updateProfile.mutate({ ...payload, id: item?.id });
      } else {
        const payload: Partial<Profile> & { imageFile: File } = {
          ...values,
          imageFile: values.image[0]!,
        };

        storeProfile.mutate(payload);
      }
    },
    [isEditMode, item, storeProfile, updateProfile]
  );

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      loading={storeProfile.isPending || updateProfile.isPending}
      title={isEditMode ? "Editar Perfil" : "Adicionar Perfil"}
      showActions={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <TextField
              label="Nome"
              name="name"
              control={control}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4 }}>
            <TextField
              label="Slug"
              name="slug"
              control={control}
              error={!!errors.slug?.message}
              helperText={errors.slug?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 2 }}>
            <TextField
              label="Idade"
              name="age"
              control={control}
              error={!!errors.age?.message}
              helperText={errors.age?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 2 }}>
            <TextField
              label="Pés"
              name="feet"
              control={control}
              error={!!errors.feet?.message}
              helperText={errors.feet?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 2 }}>
            <TextField
              label="Altura"
              name="height"
              control={control}
              error={!!errors.height?.message}
              helperText={errors.height?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 2 }}>
            <TextField
              label="Peso"
              name="weight"
              control={control}
              error={!!errors.weight?.message}
              helperText={errors.weight?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4 }}>
            <TextField
              label="Naturalidade"
              name="naturalness"
              control={control}
              error={!!errors.naturalness?.message}
              helperText={errors.naturalness?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <ImagePicker
              name="image"
              control={control}
              height={200}
              initialImage={item?.image}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 9 }}>
            <TextField
              label="Descrição"
              name="description"
              control={control}
              error={!!errors.description?.message}
              helperText={errors.description?.message}
              variant="outlined"
              multiline
              rows={7}
              fullWidth
            />
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            {(storeProfile.isError || updateProfile.isError) && (
              <p className="text-red-500 text-sm">
                Erro ao {isEditMode ? "editar" : "adicionar"} perfil.
              </p>
            )}
          </Grid2>

          <Grid2 size={{ xs: 12 }}>
            <Stack
              direction={{ sm: "row", xs: "column" }}
              gap={2}
              justifyContent="flex-end"
            >
              <Button onClick={onClose} variant="outlined" label="Fechar" />

              <Button
                onClick={() => reset()}
                variant="outlined"
                label="Limpar"
              />

              <Button
                type="submit"
                label={isEditMode ? "Atualizar" : "Adicionar"}
                loading={storeProfile.isPending || updateProfile.isPending}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </form>
    </Modal>
  );
};
