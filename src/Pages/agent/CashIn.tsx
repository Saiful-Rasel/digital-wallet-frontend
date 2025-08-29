// src/Pages/User/CashIn.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAllUserInfoCashoutQuery } from "@/Redux/feature/auth/auth.api";
import { useAgentCashInMutation } from "@/Redux/feature/agent/agent.api";


export default function CashIn() {
  const [balance, setBalance] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const { data: users = [], isLoading: usersLoading } =
    useAllUserInfoCashoutQuery(undefined);

  const [agentCashIn, { isLoading }] = useAgentCashInMutation();

  const handleCashIn = async () => {
    const CashInBalance = Number(balance);
    if (!userId) return toast.error("Please select an User");
    if (!balance || CashInBalance <= 0 || isNaN(CashInBalance)) {
      return toast.error("Please enter a valid balance");
    }

    try {
      const res = agentCashIn({userId,balance: CashInBalance}).unwrap();
      toast.success("CashIn successful!");
      setBalance("");
      setUserId("");
    } catch (error: any) {
      console.error("CashIn error:", error);
      toast.error(error.data?.message || "CashIn failed. Please try again.");
    }
  };

  return (
    <div
      className="
        space-y-4 max-w-md mx-auto p-6 w-full md:mt-10
        rounded-lg shadow-md
        bg-card text-card-foreground
        transition-colors duration-300
      "
    >
      <h2 className="text-2xl font-semibold text-center">
        CashIn Money To User
      </h2>

      {/* Agent Select */}
      <div className="space-y-2">
        <label
          htmlFor="receiver"
          className="text-sm font-medium text-foreground"
        >
          Select User
        </label>
        <select
          id="receiver"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          disabled={usersLoading || isLoading}
          className="
            w-full rounded px-3 py-2
            bg-background text-foreground border border-border
            focus:ring-2 focus:ring-ring
            transition-colors duration-200
          "
        >
          <option value="">-- Select User --</option>
          {users?.data?.map((user: any) => (
            <option
              key={user._id}
              value={user._id}
              className="bg-card text-card-foreground"
            >
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {/* Balance Input */}
      <div className="space-y-2">
        <label
          htmlFor="CashIn-balance"
          className="text-sm font-medium text-foreground"
        >
          Balance
        </label>
        <Input
          id="CashIn-balance"
          type="text"
          inputMode="decimal"
          value={balance}
          placeholder="Enter balance"
          onChange={(e) => setBalance(e.target.value)}
          disabled={isLoading}
          className="text-lg"
        />
      </div>

      {/* CashIn Button */}
      <Button
        onClick={handleCashIn}
        disabled={isLoading || !userId || !balance || Number(balance) <= 0}
        className="w-full cursor-pointer"
        size="lg"
      >
        {isLoading ? "Processing..." : "CashIn"}
      </Button>

      {/* Info Text */}
      {balance && Number(balance) > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          You are CashIning: ${Number(balance).toLocaleString()}
        </p>
      )}
    </div>
  );
}
