import { z } from "zod";

export const UserSchema = z.object({
  FirstName: z
    .string()
    .trim()
    .min(4, "First name must be at least 4 characters.")
    .max(32, "First name must not exceed 32 characters."),

  LastName: z
    .string()
    .trim()
    .min(4, "Last name must be at least 4 characters.")
    .max(32, "Last name must not exceed 32 characters."),

  Age: z.coerce
    .number()
    .int("Age must be a whole number.")
    .min(18, "Age must be at least 18.")
    .max(120, "Age must be less than 120."),

  Email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  PhoneNo: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must contain exactly 10 digits."),

  Image: z.string().trim().url("Please enter a valid image URL."),

  isVerified: z.boolean().refine((value) => value, {
    message: "You must mark the user as verified.",
  }),

  createdAt: z
    .string()
    .trim()
    .min(1, "Please choose a date.")
    .refine(
      (date) => date <= new Date().toLocaleDateString("en-US"),
      "Date must be today or in the past.",
    ),
});

export type UserFormValues = z.infer<typeof UserSchema>;

