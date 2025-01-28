"use client";

import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "./validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { Grid2, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { Profile } from "../../../../shared/types";
import { profileService } from "../../../../shared/services";
import PrivateLayout from "../../../../shared/layout/private/Private";
import {
  Button,
  ImagePicker,
  TextField,
  TopBar,
} from "../../../../shared/components";

export default function Page() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleBack = () => {
    router.back();
  };

  const storeProfile = useMutation({
    mutationKey: ["store-profile"],
    mutationFn: (payload: Partial<Profile> & { imageFile: File }) =>
      profileService.store(payload),
    onSuccess: () => {
      handleBack();
    },
  });

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (!values.image) return;

      const payload: Partial<Profile> & { imageFile: File } = {
        ...values,
        imageFile: values.image[0]!,
      };

      storeProfile.mutate(payload);
    },
    [storeProfile]
  );

  return (
    <PrivateLayout>
      <TopBar />

      <Stack p={2}>
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
              <ImagePicker name="image" control={control} height={200} />
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
              {storeProfile.isError && (
                <p className="text-red-500 text-sm">
                  Erro ao adicionar perfil.
                </p>
              )}
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Stack
                direction={{ sm: "row", xs: "column" }}
                gap={2}
                justifyContent="flex-end"
              >
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  label="Cancelar"
                />

                <Button
                  onClick={() => reset()}
                  variant="outlined"
                  label="Limpar"
                />

                <Button
                  type="submit"
                  label="Adicionar"
                  loading={storeProfile.isPending}
                />
              </Stack>
            </Grid2>
          </Grid2>
        </form>
      </Stack>
    </PrivateLayout>
  );
}
