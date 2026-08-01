"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { submitEnquiry, type ContactFormState } from "@/app/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Enquiry submitted!");
    } else if (state.status === "error") {
      toast.error(state.message ?? "Something went wrong.");
    }
  }, [state]);

  return (
    <form action={formAction} className="mx-auto flex max-w-xl flex-col gap-4 text-left">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="bg-ihg-gold w-full text-white hover:bg-ihg-gold/90"
      >
        {pending ? "Submitting..." : "Submit"}
      </Button>
      <p className="text-ihg-taupe text-center italic">
        or email us at ihgcovening@gmail.com
      </p>
    </form>
  );
}
