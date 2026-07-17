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

  isVerified: z.boolean(),

  createdAt: z.string(),
});

export type UserFormValues = z.infer<typeof UserSchema>;