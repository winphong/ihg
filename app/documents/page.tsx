const FORMS = [
  "Indemnity Form.docx",
  "PAR-Q Form.docx",
  "Line-up List.zip",
  "Rules and Regulations.zip",
  "Match Score Form.zip",
];

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="text-[350%] sm:text-[420%] md:text-[600%]">DOCUMENTS</h1>
      <div className="mt-8 flex flex-col gap-4">
        {FORMS.map((fullName) => (
          <a
            key={fullName}
            href={`/documents/${fullName}`}
            download={fullName}
            className="text-ihg-charcoal text-[150%] hover:underline"
          >
            {fullName.split(".")[0]}
          </a>
        ))}
      </div>
    </div>
  );
}
