import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/me/dashboard").then((res) => {
      setData(res.data.data);
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Total Donated: ₦{data.totalDonated}</p>
      <p>Successful Contributions: {data.successfulContributions}</p>
      <p>Groups Joined: {data.totalGroupsJoined}</p>
    </div>
  );
}
