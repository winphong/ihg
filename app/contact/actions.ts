"use server";

import { createEnquiry, ApiError } from "@/lib/api";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitEnquiry(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const input = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  try {
    await createEnquiry(input);
    return { status: "success" };
  } catch (err) {
    const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
    return { status: "error", message };
  }
}
