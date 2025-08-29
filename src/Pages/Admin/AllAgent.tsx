import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useAdminAllAgentQuery,
  useBlockMutation,
  useLazyGetWalletByUserQuery,
  useSusPendAgentMutation,
  useUnBlockMutation,
} from "@/Redux/feature/Admin/Admin.api";
import { toast } from "sonner";

export default function AllAgent() {

  const [wallets, setWallets] = useState<Record<string, boolean>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch agents
  const { data: usersData, isLoading } = useAdminAllAgentQuery(undefined);

  // Mutations
  const [suspendAgent, { isLoading: suspendLoading }] =
    useSusPendAgentMutation();
  const [blockWallet] = useBlockMutation();
  const [unBlockWallet] = useUnBlockMutation();

  // Lazy query for wallet fetch
  const [getWalletByUser] = useLazyGetWalletByUserQuery();

  // Fetch wallet status for all agents
  useEffect(() => {
    const fetchWallets = async () => {
      if (!usersData?.data) return;
      for (const user of usersData.data) {
        try {
          const walletRes = await getWalletByUser(user._id).unwrap();
          if (walletRes?.data?._id) {
            setWallets((prev) => ({
              ...prev,
              [user._id]: walletRes.data.isBlocked,
            }));
          }
        } catch (err) {
          console.error("Wallet fetch failed for user:", user._id);
        }
      }
    };
    fetchWallets();
  }, [usersData, getWalletByUser]);

  // Suspend agent
  const handleSuspend = async (userId: string) => {
    setLoadingId(userId);
    try {
      await suspendAgent(userId).unwrap();
      toast.success("Agent suspended successfully");
    } catch (err) {
      toast.error("Failed to suspend agent");
    }
    setLoadingId(null);
  };

  // Toggle wallet block/unblock
  const handleBlockToggle = async (userId: string) => {
    setLoadingId(userId);
    try {
      let isBlocked = wallets[userId];

      // Fetch wallet if undefined
      if (isBlocked === undefined) {
        const walletRes = await getWalletByUser(userId).unwrap();
        if (!walletRes?.data?._id) {
          toast.error("Wallet not found for this user");
          setLoadingId(null);
          return;
        }
        isBlocked = walletRes.data.isBlocked;
        setWallets((prev) => ({ ...prev, [userId]: isBlocked }));
      }

      const walletRes = await getWalletByUser(userId).unwrap();
      const walletId = walletRes.data._id;

      if (isBlocked) {
        await unBlockWallet(walletId).unwrap();
        toast.success("Wallet unblocked successfully");
      } else {
        await blockWallet(walletId).unwrap();
        toast.success("Wallet blocked successfully");
      }

      setWallets((prev) => ({ ...prev, [userId]: !isBlocked }));
    } catch (err) {
      toast.error("Failed to update wallet");
    }
    setLoadingId(null);
  };

  if (isLoading) return <p>Loading...</p>;

  // Pagination calculations
  const totalItems = usersData?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = usersData?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Manage Agents
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
                className="border-t border-gray-300 dark:border-gray-700"
              >
                <td className="p-2 text-gray-900 dark:text-gray-100">
                  {user.name}
                </td>

                <td className="p-2 capitalize text-gray-900 dark:text-gray-100">
                  {user.role}
                </td>
                <td className="p-2 capitalize text-gray-900 dark:text-gray-100">
                  {user.isActive}
                </td>
                <td className="p-2 flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="default"
                    disabled={loadingId === user._id || suspendLoading}
                    onClick={() => handleSuspend(user._id)}
                  >
                    Suspend
                  </Button>

                  <Button
                    size="sm"
                   variant={wallets[user._id] ? "destructive" : "default"}
                    disabled={loadingId === user._id}
                    onClick={() => handleBlockToggle(user._id)}
                  >
                 {wallets[user._id] ? "Unblock Wallet" : "Block Wallet" }
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
