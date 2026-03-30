"use server";

import { hash, compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/dal";
import { UpdateProfileSchema, ChangePasswordSchema, FormState } from "@/lib/definitions";
import { revalidatePath } from "next/cache";

export async function updateProfile(state: FormState, formData: FormData): Promise<FormState> {
  const session = await verifySession();
  if (!session) return { message: "Unauthorized" };

  const validatedFields = UpdateProfileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    educationStatus: formData.get("educationStatus") || undefined,
    course: formData.get("course") || undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...validatedFields.data,
        educationStatus: validatedFields.data.educationStatus || null,
        course: validatedFields.data.course || null,
      },
    });

    revalidatePath("/settings");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      message: "Failed to update profile.",
    };
  }
}

export async function changePassword(state: FormState, formData: FormData): Promise<FormState> {
  const session = await verifySession();
  if (!session) return { message: "Unauthorized" };

  const validatedFields = ChangePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { passwordHash: true },
    });

    if (!user) return { message: "User not found." };

    const matches = await compare(currentPassword, user.passwordHash);
    if (!matches) {
      return {
        message: "Incorrect current password.",
      };
    }

    const passwordHash = await hash(newPassword, 10);

    await prisma.user.update({
      where: { id: session.userId },
      data: { passwordHash },
    });

    return {
      success: true,
      message: "Password updated successfully.",
    };
  } catch (error) {
    console.error("Password change error:", error);
    return {
      message: "Failed to change password.",
    };
  }
}
