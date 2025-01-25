"use client";

import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth } from "@/shared/lib/firebase"; // Ajuste o caminho conforme sua estrutura de pastas
import { Button, TextField } from "@/shared/components";
import { Grid2, Stack } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, FormValues } from "./validators";
import SessionLayout from "@/shared/layout/session/Session";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const onSubmit = async ({ email, password }: FormValues) => {
    const userCred = await signInWithEmailAndPassword(email, password);

    if (userCred) {
      const token = await userCred.user.getIdToken();
      // Define o cookie
      document.cookie = `token=${token}; path=/;`;
      router.push("/admin");
    }
  };

  return (
    <SessionLayout>
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        bgcolor="secondary.main"
        className="p-8 rounded-sm shadow max-w-sm mx-auto"
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <div className="flex justify-center w-full text-4xl font-bold">
              Casa DoJoB
            </div>

            <h1 className="text-center text-2xl font-bold mt-4 mb-4">
              Entrar na casa DoJob
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
            <div className="flex justify-center w-full">
              Não tem uma conta?{" "}
              <Link
                href="/registrar"
                className="font-semibold text-secondary ml-1.5"
              >
                Registre-se
              </Link>
            </div>
          </Grid2>

          <Grid2 size={12}>
            <div className="flex justify-center w-full">
              <Button type="submit" size="large" fullWidth>
                Entrar
              </Button>
            </div>
          </Grid2>
        </Grid2>
      </Stack>
    </SessionLayout>
  );
}
