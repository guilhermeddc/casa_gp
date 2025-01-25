import { z } from "zod";

export const formSchema = (isEditMode: boolean) =>
  z.object({
    name: z.string().min(1, "O título é obrigatório").trim(),
    slug: z
      .string()
      .min(1, "O slug é obrigatório")
      .regex(
        /^[a-z0-9-]+$/,
        "O slug deve conter apenas letras minúsculas sem acentos, números e hifens, sem espaços ou outros caracteres especiais e deve ser único"
      )
      .trim(),
    description: z.string().min(1, "A descrição é obrigatória").trim(),
    age: z.string().min(1, "A idade é obrigatória").trim(),
    height: z.string().min(1, "A altura é obrigatória").trim(),
    weight: z.string().min(1, "O peso é obrigatório").trim(),
    feet: z.string().min(1, "O número de pés é obrigatório"),
    naturalness: z.string().min(1, "A naturalidade é obrigatória").trim(),
    image: z.any().refine(
      (val) => {
        if (isEditMode) {
          if (!val || !(val instanceof FileList) || val.length === 0) {
            return true;
          }
          const file = val[0];
          const validTypes = ["image/jpeg", "image/png", "image/gif"];
          return validTypes.includes(file.type);
        } else {
          if (val && val instanceof FileList && val.length > 0) {
            const file = val[0];
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            return validTypes.includes(file.type);
          }
          return false;
        }
      },
      {
        message: isEditMode
          ? "Formato de imagem não suportado"
          : "A imagem é obrigatória",
      }
    ),
  });

export type FormValues = z.infer<ReturnType<typeof formSchema>>;
