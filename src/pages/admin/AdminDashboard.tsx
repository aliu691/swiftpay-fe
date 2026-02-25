import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/ledger/dashboard").then((res) => {
      setData(res.data.data);
    });
  }, []);

  if (!data) return <div>Loading....</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Contributions: ₦{data.totalContributions}</p>
      <p>Total Payout Amount: ₦{data.totalPayoutAmount}</p>
      <p>Paid Out Groups: {data.paidOutGroups}</p>
    </div>
  );
}
