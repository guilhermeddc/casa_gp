"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, TextField } from "../../../../shared/components";
import { Grid2, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "./validators";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../../../shared/services";
import { User } from "../../../../shared/types";
import SessionLayout from "../../../../shared/layout/session/Session";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const register = useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: User & { password: string }) =>
      userService.store(payload),
  });

  const onSubmit = async (values: FormValues) => {
    register.mutate(
      { ...values },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  return (
    <SessionLayout>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        bgcolor="secondary.main"
        className="p-8 rounded-sm shadow max-w-md mx-auto"
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <div className="flex justify-center w-full text-4xl font-bold">
              Casa DoJoB
            </div>

            <h1 className="text-center text-2xl font-bold mt-4 mb-4">
              Registrar na casa DoJob
            </h1>
          </Grid2>

          <Grid2 size={12}>
            <TextField
              label="E-mail"
              name="email"
              control={control}
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              variant="outlined"
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              label="Senha"
              name="password"
              control={control}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              variant="outlined"
              type="password"
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              label="Confirmar Senha"
              name="confirmPassword"
              control={control}
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
              variant="outlined"
              type="password"
              fullWidth
            />
          </Grid2>

          <Grid2 size={12}>
            <div className="flex justify-center w-full">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-semibold text-secondary ml-1.5"
              >
                Entrar
              </Link>
            </div>
          </Grid2>

          <Grid2 size={12}>
            <div className="flex justify-center w-full">
              <Button
                type="submit"
                size="large"
                fullWidth
                loading={register.isPending}
              >
                Registrar
              </Button>
            </div>
          </Grid2>
        </Grid2>
      </Stack>
    </SessionLayout>
  );
}
