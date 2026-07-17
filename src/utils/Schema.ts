import { z } from "zod"

export const UserSchema = z.object({
  FirstName: z
    .string()
    .min(4, "Name must be at least 4 characters.")
    .max(32, "Name must be at most 32 characters."),
    LastName: z
    .string()
    .min(4, "Last Name must be at least 4 characters.")
    .max(32, "Last Name must be at most 32 characters."),
    Age : z
    .coerce.number()
    .min(18, "You must be at least 18 years old.")
    .max(120, "You must be at most 120 years old."),
    Email : z
    .string()
    .min(10, "Email must be at least 1 character.")
    .max(50, "Email must be at most 50 characters.")
    .email("Invalid email format."),
    PhoneNo: z
    .string()
    .min(20, "Phone Number must be at least 20 characters.")
    .max(100, "Phone Number must be at most 100 characters."),
    isVerified : z
    .boolean()
    .default(false),
    createdAt : z
    .date()
    .default(new Date()),
})


export type FormSchemaType = z.infer<typeof UserSchema> 
export type FormOutputType = z.output<typeof UserSchema>
