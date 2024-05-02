import {z} from "zod";


export const formSchema = z.object({
  name: z.string().min(4, {
    message: "Form adı en az 4 karakter olmalıdır.",
  }),
  description: z.string().optional(),
});

export type formSchemaTye = z.infer<typeof formSchema>;
