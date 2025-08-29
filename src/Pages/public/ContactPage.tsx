export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted (simulated)!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Message"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
