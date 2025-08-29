const faqs = [
  { q: "How do I create an account?", a: "Click on register and fill out the form." },
  { q: "Is my money safe?", a: "Yes, we use top-level encryption." },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          FAQs
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="p-6 border rounded-lg bg-white dark:bg-gray-800 transition hover:shadow-lg"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{f.q}</h3>
              <p className="text-gray-700 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
