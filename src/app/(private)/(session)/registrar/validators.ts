import { z } from "zod";

export const formSchema = z
  .object({
    email: z
      .string({
        required_error: "O campo e-mail é obrigatório",
      })
      .email("O e-mail deve ser válido"),
    password: z
      .string({
        required_error: "O campo senha é obrigatório",
      })
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z
      .string({
        required_error: "O campo repetir senha é obrigatório",
      })
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof formSchema>;
