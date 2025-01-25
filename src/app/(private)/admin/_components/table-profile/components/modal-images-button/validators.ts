import { z } from "zod";

export const formSchema = z.object({
  images: z.array(
    z.object({
      image: z.any().refine(
        (val) => {
          if (val && val instanceof FileList && val.length > 0) {
            const file = val[0];
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            return validTypes.includes(file.type);
          }
          return false;
        },
        { message: "É necessário enviar uma imagem válida." }
      ),
    })
  ),
});

export type FormValues = z.infer<typeof formSchema>;
