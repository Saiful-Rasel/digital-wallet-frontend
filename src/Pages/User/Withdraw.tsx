// src/Pages/User/Withdraw.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAllUserInfoCashoutQuery } from "@/Redux/feature/auth/auth.api";
import { useUserCashOutMutation } from "@/Redux/feature/agent/agent.api";

export default function Withdraw() {
  const [balance, setBalance] = useState<string>("");
  const [agentId, setAgentId] = useState<string>("");

  const { data: users = [], isLoading: usersLoading } =
    useAllUserInfoCashoutQuery(undefined);

  const [userCashOut, { isLoading }] = useUserCashOutMutation();

  const handleWithdraw = async () => {
    const withdrawBalance = Number(balance);
    if (!agentId) return toast.error("Please select an agent");
    if (!balance || withdrawBalance <= 0 || isNaN(withdrawBalance)) {
      return toast.error("Please enter a valid balance");
    }

    try {
       await userCashOut({ agentId, balance: withdrawBalance }).unwrap();
      toast.success("Withdraw successful!");
      setBalance("");
      setAgentId("");
    } catch (error: any) {
      console.error("Withdraw error:", error);
      toast.error(error.data?.message || "Withdraw failed. Please try again.");
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
        Withdraw Money (Cash Out)
      </h2>

      {/* Agent Select */}
      <div className="space-y-2">
        <label
          htmlFor="receiver"
          className="text-sm font-medium text-foreground"
        >
          Select Agent
        </label>
        <select
          id="receiver"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          disabled={usersLoading || isLoading}
          className="
            w-full rounded px-3 py-2
            bg-background text-foreground border border-border
            focus:ring-2 focus:ring-ring
            transition-colors duration-200
          "
        >
          <option value="">-- Select Agent --</option>
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
          htmlFor="withdraw-balance"
          className="text-sm font-medium text-foreground"
        >
          Balance
        </label>
        <Input
          id="withdraw-balance"
          type="text"
          inputMode="decimal"
          value={balance}
          placeholder="Enter balance"
          onChange={(e) => setBalance(e.target.value)}
          disabled={isLoading}
          className="text-lg"
        />
      </div>

      {/* Withdraw Button */}
      <Button
        onClick={handleWithdraw}
        disabled={isLoading || !agentId || !balance || Number(balance) <= 0}
        className="w-full cursor-pointer"
        size="lg"
      >
        {isLoading ? "Processing..." : "Withdraw"}
      </Button>

      {/* Info Text */}
      {balance && Number(balance) > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          You are withdrawing: ${Number(balance).toLocaleString()}
        </p>
      )}
    </div>
  );
}
