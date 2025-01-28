"use client";

import React, { useState } from "react";

import { Delete, Info } from "@mui/icons-material";
import { Chip, Grid2, Paper, Stack, Tooltip } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import { FiImage } from "react-icons/fi";
import { useFieldArray, useForm } from "react-hook-form";
import { formSchema, FormValues } from "./validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageService } from "../../../../../../../shared/services";
import { ImageFormValues } from "../../../../../../../shared/types";
import {
  Button,
  ImagePicker,
  Modal,
  ModalConfirm,
} from "../../../../../../../shared/components";

interface IProps {
  id: string;
}

export const ModalImagesButton: React.FC<IProps> = ({ id }) => {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: images, refetch } = useQuery({
    queryKey: ["images", id],
    queryFn: () => imageService.index(id),
    enabled: !!id,
  });

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [
        {
          image: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const handleOpenModalConfirm = (id: string) => {
    setImageId(id);
    setOpenModalConfirm(true);
  };

  const handleCloseModalConfirm = () => {
    setImageId(null);
    setOpenModalConfirm(false);
  };

  const storeImage = useMutation({
    mutationKey: ["storeImage", id],
    mutationFn: (data: ImageFormValues) =>
      imageService.store({ profile_id: id, images: data.images }),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log("*** error", error);
    },
  });

  const destroyImage = useMutation({
    mutationKey: ["destroyImage", imageId],
    mutationFn: () => imageService.destroy(String(imageId)),
    onSuccess: () => {
      refetch();
      handleCloseModalConfirm();
    },
  });

  const onSubmit = (data: FormValues) => {
    storeImage.mutate({ images: data.images as any, profile_id: id });
  };

  return (
    <>
      <Tooltip title="Adicionar/Remover imagens" arrow>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={destroyImage.isPending}
          className="bg-stone-100 p-2 rounded shadow text-sm text-stone-500 hover:text-red-500 hover:bg-stone-200 transition-all ease-in-out"
        >
          <FiImage />
        </button>
      </Tooltip>

      {isModalOpen && (
        <Modal
          open
          onClose={() => setIsModalOpen(false)}
          onClick={() => handleSubmit(onSubmit)()}
          title="Images"
          fullWidth
          maxWidth="md"
          labelCloseButton="Fechar"
          labelSaveButton="Salvar"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              {fields.map((field, index) => (
                <Grid2 key={field.image} size={{ xs: 6, md: 4 }}>
                  <ImagePicker
                    control={control}
                    name={`images.${index}.image`}
                    label={`Imagem #${index + 1}`}
                  />
                </Grid2>
              ))}

              {!images ? (
                <Grid2 size={12}>
                  <Stack justifyContent="center" alignItems="center" gap={2}>
                    <Chip label="Não há imagens cadastradas" icon={<Info />} />

                    <Button
                      variant="outlined"
                      onClick={() => append({ image: undefined as any })}
                    >
                      Adicionar nova imagem
                    </Button>
                  </Stack>
                </Grid2>
              ) : (
                <Grid2 size={12}>
                  <Stack justifyContent="center" alignItems="center" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={() => append({ image: undefined as any })}
                    >
                      Adicionar nova imagem
                    </Button>
                  </Stack>
                </Grid2>
              )}

              {images?.map((image) => (
                <Grid2 key={image.id} size={{ xs: 12, md: 4 }}>
                  <Stack position="relative">
                    <Stack
                      position="absolute"
                      top={10}
                      right={10}
                      sx={{
                        "& > button": {
                          borderRadius: 40,
                          opacity: 0.7,
                          color: "secondary.main",
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <Button
                        startIcon={<Delete />}
                        onClick={() => handleOpenModalConfirm(String(image.id))}
                        label="Excluir"
                        variant="text"
                      />
                    </Stack>

                    <Paper component="img" src={image?.image} alt="" />
                  </Stack>
                </Grid2>
              ))}
            </Grid2>
          </form>
        </Modal>
      )}

      <ModalConfirm
        opened={openModalConfirm}
        onClose={handleCloseModalConfirm}
        loading={destroyImage.isPending}
        onClick={destroyImage.mutate}
      />
    </>
  );
};
