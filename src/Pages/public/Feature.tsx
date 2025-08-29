const features = [
  { title: "Fast Transactions", description: "Send money instantly." },
  { title: "Secure Wallet", description: "Top-level encryption." },
  { title: "Analytics", description: "Track spending habits." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:mx-40">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 border rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {f.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
