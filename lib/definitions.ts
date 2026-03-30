import { z } from "zod";

export const SignupFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }).trim(),
  lastName: z.string().min(1, { message: "Last name is required." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim().toLowerCase(),
  educationStatus: z.string().min(1, { message: "Education status is required." }).trim(),
  password: z
    .string()
    .min(6, { message: "Be at least 6 characters long." })
    .trim(),
  confirmPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }).trim(),
  lastName: z.string().min(1, { message: "Last name is required." }).trim(),
  educationStatus: z.string().min(1, { message: "Education status is required." }).trim(),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters." }),
});

export type FormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        educationStatus?: string[];
        password?: string[];
        confirmPassword?: string[];
        currentPassword?: string[];
        newPassword?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
