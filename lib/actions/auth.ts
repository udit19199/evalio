"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SignupFormSchema, FormState } from "@/lib/definitions";

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    educationStatus: formData.get("educationStatus"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, educationStatus, password } = validatedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return {
        message: "Email is already registered.",
      };
    }

    const passwordHash = await hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        educationStatus,
        passwordHash,
      },
    });

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      message: "An error occurred while creating your account.",
    };
  }
}
