// src/Pages/User/Deposit.tsx
import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDepositWalletMutation } from "@/Redux/feature/wallet/wallet.api";
import { toast } from "sonner";

export default function Deposit() {
  const [balance, setBalance] = useState<string>("");
  const [depositWallet, { isLoading }] = useDepositWalletMutation();

  const handleDeposit = async () => {
    const amount = Number(balance);
    if (!balance || amount <= 0 || isNaN(amount)) {
      return toast.error("Please enter a valid amount");
    }
    try {
     await depositWallet({ balance: amount }).unwrap();
      toast.success("Deposit successful!");
      setBalance(""); 

    } catch (error: any) {
      console.error("Deposit error:", error);
      toast.error(error.data?.message || "Deposit failed. Please try again.");
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
        Deposit Money From Your Bank Account
      </h2>

      <div className="space-y-2">
        <label
          htmlFor="deposit-amount"
          className="text-sm font-medium text-foreground"
        >
          Amount
        </label>
        <Input
          id="deposit-amount"
          type="text"
          inputMode="decimal"
          value={balance}
          placeholder="Enter amount"
          onChange={(e) => setBalance(e.target.value)}
          disabled={isLoading}
          className="text-lg"
        />
      </div>

      <Button
        onClick={handleDeposit}
        disabled={isLoading || !balance || Number(balance) <= 0}
        className="w-full cursor-pointer"
        size="lg"
      >
        {isLoading ? "Processing..." : "Deposit"}
      </Button>

      {balance && Number(balance) > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          You are depositing: ${Number(balance).toLocaleString()}
        </p>
      )}
    </div>
  );
}
