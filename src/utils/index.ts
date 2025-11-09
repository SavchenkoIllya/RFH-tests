import { z } from "zod";

export const sharedSchema = z.object({
  firstName: z
    .string()
    .min(1, "Имя обязательно")
    .max(3, "Максимум 50 символов")
    .trim(),
  lastName: z
    .string()
    .min(1, "Фамилия обязательна")
    .max(5, "Максимум 50 символов")
    .trim(),
});

export type SharedValues = z.infer<typeof sharedSchema>;

export const formOneSchema = z
  .object({
    email: z.email("Некорректный email").trim(),
  })
  .extend(sharedSchema.shape);

export type FormOneValues = z.infer<typeof formOneSchema>;

export const formTwoSchema = z.object({
  userData: z.object({
    data: sharedSchema,
  }),
  amountOfUsers: z.number().min(0),
});

export type FormTwoValues = z.infer<typeof formTwoSchema>;

export const formArraySchema = z.object({
  userData: z.array(sharedSchema.extend({ id: z.number() })).nonempty(),
});

export type FormArrayValues = z.infer<typeof formArraySchema>;
