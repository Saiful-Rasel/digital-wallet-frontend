import { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useAdminAlltransactionsQuery } from "@/Redux/feature/Admin/Admin.api";

export default function AllTransactionHistory() {
  const { data, isLoading } = useAdminAlltransactionsQuery(undefined);
  const transactions = data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6  border border-radius-md">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>

        <div className="hidden md:block">
          <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Receiver</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData?.map((tx: any) => (
                <TableRow key={tx._id}>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{tx.sender?.name || "N/A"}</TableCell>
                  <TableCell>{tx.receiver?.name || "N/A"}</TableCell>
                  <TableCell className="capitalize">{tx.type}</TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>
                    {
                      tx.balance
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="block md:hidden space-y-4">
          {paginatedData?.map((tx: any) => (
            <div
              key={tx._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="text-sm text-gray-500">
                {new Date(tx.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Sender:</span>{" "}
                {tx.sender?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Receiver:</span>{" "}
                {tx.receiver?.name || "N/A"}
              </p>
              <p className="capitalize">
                <span className="font-semibold">Type:</span> {tx.type}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {tx.status}
              </p>
              <p
                className={`font-bold ${
                  tx.type.includes("cash-out") || tx.type.includes("withdraw")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {tx.type.includes("cash-out") || tx.type.includes("withdraw")
                  ? `- ${tx.balance}`
                  : `+ ${tx.balance}`}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="text-sm">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
