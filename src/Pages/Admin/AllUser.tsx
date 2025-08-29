import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAdminAllUserQuery,
  useApproveUserMutation,
  useBlockMutation,
  useLazyGetWalletByUserQuery,
  useUnBlockMutation,
} from "@/Redux/feature/Admin/Admin.api";
import { toast } from "sonner";

export default function Alluser() {
  const [wallets, setWallets] = useState<
    Record<string, { id: string; isBlocked: boolean }>
  >({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: usersData, isLoading,refetch } = useAdminAllUserQuery(undefined);
  const [approveUser, { isLoading: approveLoading }] = useApproveUserMutation();
  const [blockWallet] = useBlockMutation();
  const [unBlockWallet] = useUnBlockMutation();
  const [getWalletByUser] = useLazyGetWalletByUserQuery();

  useEffect(() => {
    if (!usersData?.data) return;

    const fetchWallets = async () => {
      const newWallets: Record<string, { id: string; isBlocked: boolean }> = {};

      for (const user of usersData.data) {
        // Only fetch if we don't already have wallet info
        if (!wallets[user._id]) {
          try {
            const walletRes = await getWalletByUser(user._id).unwrap();
            if (walletRes?.data?._id) {
              newWallets[user._id] = {
                id: walletRes.data._id,
                isBlocked: walletRes.data.isBlocked,
              };
            }
          } catch (err) {
            console.error(err);
          }
        }
      }

      // Merge new wallets without overwriting existing state
      if (Object.keys(newWallets).length) {
        setWallets((prev) => ({ ...prev, ...newWallets }));
      }
    };

    fetchWallets();
    // ❌ Note: do NOT add `wallets` to dependency array
  }, [usersData, getWalletByUser]);

  const handleApprove = async (userId: string) => {
    setLoadingId(userId);
    try {
      await approveUser(userId).unwrap();
      toast.success("User approved successfully");
      refetch();
    } catch {
      toast.error("Failed to approve user");
    }
    setLoadingId(null);
  };

  const handleBlockToggle = async (userId: string) => {
    setLoadingId(userId);
    try {
      const wallet = wallets[userId];

      if (!wallet) {
        toast.error("Wallet not loaded yet");
        setLoadingId(null);
        return;
      }

      if (wallet.isBlocked) {
        await unBlockWallet(wallet.id).unwrap();
        toast.success("Wallet unblocked");
      } else {
        await blockWallet(wallet.id).unwrap();
        toast.success("Wallet blocked");
      }

      setWallets((prev) => ({
        ...prev,
        [userId]: { ...wallet, isBlocked: !wallet.isBlocked },
      }));
    } catch {
      toast.error("Failed to update wallet");
    }
    setLoadingId(null);
  };

  if (isLoading) return <p>Loading...</p>;

  // Pagination
  const totalItems = usersData?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = usersData?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Manage Users
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="p-2 text-left text-gray-900 dark:text-gray-100">
                Name
              </th>

              <th className="p-2 text-left text-gray-900 dark:text-gray-100">
                Role
              </th>
              <th className="p-2 text-left text-gray-900 dark:text-gray-100">
                isActive
              </th>
              <th className="p-2 text-left text-gray-900 dark:text-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((user: any) => (
              <tr
                key={user._id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <td className="p-2 text-gray-900 dark:text-gray-100">
                  {user.name}
                </td>
                <td className="p-2 capitalize text-gray-900 dark:text-gray-100">
                  {user.role}
                </td>
                <td className="p-2 capitalize text-gray-900 dark:text-gray-100">
                  {user.isActive ? "Active" : "Inactive"}
                </td>
                <td className="p-2 flex flex-row gap-2 flex-wrap md:flex-nowrap">
                  <Button
                    size="sm"
                    className=""
                    variant="default"
                    disabled={loadingId === user._id || approveLoading}
                    onClick={() => handleApprove(user._id)}
                  >
                    Make Agent
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      wallets[user._id]?.isBlocked ? "destructive" : "default"
                    }
                    disabled={loadingId === user._id}
                    onClick={() => handleBlockToggle(user._id)}
                  >
                    {wallets[user._id]?.isBlocked ? "Unblock Wallet" : "Block Wallet"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <p className="text-gray-900 dark:text-gray-100">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
