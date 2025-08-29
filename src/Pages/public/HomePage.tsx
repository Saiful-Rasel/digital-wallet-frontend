// components/Hero.tsx
import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/Redux/feature/auth/auth.api";
import { Link, useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const { data, isLoading } = useUserInfoQuery(undefined);

  const handleGetStarted = () => {
    if (!isLoading) {
      const role = data?.data?.role;
      if (!role) {
        navigate("/register");
      } else {
        if (role === "USER") navigate("/user/overview");
        else if (role === "AGENT") navigate("/agent/cash-in");
        else if (role === "ADMIN") navigate("/admin/all-user");
      }
    }
  };
  return (
    <section className="w-full h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-center">
      <div className="px-6">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Welcome to Digital Wallet
        </h1>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Send money, manage your transactions, and track your wallet
          seamlessly.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={handleGetStarted}>
            <Link to="/dashboard">Get Started</Link>
          </Button>
          <Button>
            <Link to="/features">Explore More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
