const plans = [
  { title: "Free", price: "$0/mo", features: ["Basic Transactions"] },
  { title: "Pro", price: "$9.99/mo", features: ["Unlimited Transactions", "Analytics"] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Pricing
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="p-6 border rounded-lg text-center bg-white dark:bg-gray-800 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{plan.title}</h3>
              <p className="text-2xl mb-4 text-gray-900 dark:text-white">{plan.price}</p>
              <ul className="mb-4 text-gray-700 dark:text-gray-300">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
