// src/Pages/User/Overview.tsx

import { Link } from "react-router";

export default function UserOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 bg-blue-500 text-white rounded-xl">
          <Link to="/user/deposit">Deposit</Link>
        </button>
        <button className="p-4 bg-red-500 text-white rounded-xl">
          <Link to="/user/withdraw">Withdraw</Link>
        </button>
        <button className="p-4 bg-green-500 text-white rounded-xl">
          <Link to="/user/transfer">Transfer</Link>
        </button>
        <button className="p-4 bg-gray-500 text-white rounded-xl">
          <Link to="/user/history">History</Link>
        </button>
      </div>
    </div>
  );
}
