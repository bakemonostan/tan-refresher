import * as z from "zod";

export const baseFormSchema = z.object({
  title: z
    .string({ error: "Title is required." })
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string({ error: "Description is required." })
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  color: z
    .string({ error: "Color is required." })
    .min(1, "Please select a color."),
  agree: z
    .boolean({ error: "You must agree to continue." })
    .refine((val) => val === true, {
      message: "You must agree to continue.",
    }),
  size: z
    .string({ error: "Size is required." })
    .min(1, "Please select a size."),
  notifications: z.boolean({ error: "Notifications are required." }),
  volume: z.number({ error: "Volume is required." }).min(0).max(100),
  age: z
    .number({ error: "Age is required." })
    .min(1, "Age must be at least 1")
    .max(120, "Age must be at most 120"),
  birthDate: z.date({ error: "Birth date is required." }),
  pin: z
    .string({ error: "PIN is required." })
    .length(6, "PIN must be exactly 6 digits."),
  dateRange: z
    .object(
      {
        from: z.date({ error: "Start date is required." }),
        to: z.date({ error: "End date is required." }).optional(),
      },
      {
        error: "Please select both start and end dates.",
      }
    )
    .refine((data) => data.from && data.to, {
      error: "Please select both start and end dates.",
    }),
});

export type BaseFormSchema = z.infer<typeof baseFormSchema>;

