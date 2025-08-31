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
import { useTransactionHistoryQuery } from "@/Redux/feature/trransaction/transaction.api";
import { Button } from "@/components/ui/button";

export default function TransactionHistory() {
  const { data, isLoading } = useTransactionHistoryQuery(undefined);
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
    <div className="p-6 border rounded-md dark:border-gray-700">
      <div>
        <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">
          Transaction History
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableCaption className="dark:text-gray-400">
              A list of your recent transactions.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">Date</TableHead>
                <TableHead className="dark:text-gray-300">Sender</TableHead>
                <TableHead className="dark:text-gray-300">Receiver</TableHead>
                <TableHead className="dark:text-gray-300">Type</TableHead>
                <TableHead className="dark:text-gray-300">Status</TableHead>
                <TableHead className="text-right dark:text-gray-300">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData?.map((tx: any) => (
                <TableRow
                  key={tx._id}
                  className="dark:hover:bg-gray-800 dark:border-gray-700"
                >
                  <TableCell className="dark:text-gray-200">
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="dark:text-gray-200">
                    {tx.sender?.name || "N/A"}
                  </TableCell>
                  <TableCell className="dark:text-gray-200">
                    {tx.receiver?.name || "N/A"}
                  </TableCell>
                  <TableCell className="capitalize dark:text-gray-200">
                    {tx.type}
                  </TableCell>
                  <TableCell className="dark:text-gray-200">
                    {tx.status}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      tx.type.includes("cash-out") ||
                      tx.type.includes("withdraw")
                        ? "text-red-500 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {tx.type.includes("cash-out") ||
                    tx.type.includes("withdraw")
                      ? `- ${tx.balance}`
                      : `+ ${tx.balance}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {paginatedData?.map((tx: any) => (
            <div
              key={tx._id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(tx.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Sender:</span>{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  {tx.sender?.name || "N/A"}
                </span>
              </p>
              <p>
                <span className="font-semibold">Receiver:</span>{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  {tx.receiver?.name || "N/A"}
                </span>
              </p>
              <p className="capitalize">
                <span className="font-semibold">Type:</span>{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  {tx.type}
                </span>
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  {tx.status}
                </span>
              </p>
              <p
                className={`font-bold ${
                  tx.type.includes("cash-out") || tx.type.includes("withdraw")
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {tx.type.includes("cash-out") || tx.type.includes("withdraw")
                  ? `- ${tx.balance}`
                  : `+ ${tx.balance}`}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="text-sm dark:text-gray-300">
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
