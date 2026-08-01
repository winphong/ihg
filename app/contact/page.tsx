import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="mb-8 text-[350%] sm:text-[420%] md:text-[600%]">CONTACT US</h1>
      <ContactForm />
    </div>
  );
}
