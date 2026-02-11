import {z} from "zod"

export const createTodoSchema = z.object({
  title: z
  .string()
  .min(1, "Title is required")
  .max(100, "Shrink title <100 chars")
  .trim(),

  description: z
  .string()
  .max(300, "Minimize Description")
  .optional(),

  priority: z
  .enum(["low", "medium", "high"])
  .default("medium")
})