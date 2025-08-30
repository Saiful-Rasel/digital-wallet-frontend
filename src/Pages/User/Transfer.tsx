
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransferWalletMutation } from "@/Redux/feature/wallet/wallet.api";
import { useAllUserInfoTransferQuery } from "@/Redux/feature/auth/auth.api";

export default function Transfer() {
  const [balance, setBalance] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");

  const { data: users = [], isLoading: usersLoading } =
    useAllUserInfoTransferQuery(undefined);

  const [transferWallet, { isLoading }] = useTransferWalletMutation();

  const handleTransfer = async () => {
    const transferBalance = Number(balance);
    if (!receiverId) return toast.error("Please select a receiver");
    if (!balance || transferBalance <= 0 || isNaN(transferBalance)) {
      return toast.error("Please enter a valid balance");
    }

    try {
        await transferWallet({
        receiverId,
        balance: transferBalance,
      }).unwrap();
      toast.success("Transfer successful!");
      setBalance("");
      setReceiverId("");
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast.error(error.data?.message || "Transfer failed. Please try again.");
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
      <h2 className="text-2xl font-semibold text-center">Transfer Money</h2>

      {/* Receiver Select */}
      <div className="space-y-2">
        <label
          htmlFor="receiver"
          className="text-sm font-medium text-foreground"
        >
          Select Receiver
        </label>
        <select
          id="receiver"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          disabled={usersLoading || isLoading}
          className="
            w-full rounded px-3 py-2
            bg-background text-foreground border border-border
            focus:ring-2 focus:ring-ring
            transition-colors duration-200
          "
        >
          <option value="">-- Select Receiver --</option>
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
          htmlFor="transfer-balance"
          className="text-sm font-medium text-foreground"
        >
          Balance
        </label>
        <Input
          id="transfer-balance"
          type="text"
          inputMode="decimal"
          value={balance}
          placeholder="Enter balance"
          onChange={(e) => setBalance(e.target.value)}
          disabled={isLoading}
          className="text-lg"
        />
      </div>

      {/* Action Button */}
      <Button
        onClick={handleTransfer}
        disabled={isLoading || !receiverId || !balance || Number(balance) <= 0}
        className="w-full cursor-pointer"
        size="lg"
      >
        {isLoading ? "Processing..." : "Transfer"}
      </Button>

      {/* Info Text */}
      {balance && Number(balance) > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          You are transferring: ${Number(balance).toLocaleString()}
        </p>
      )}
    </div>
  );
}
