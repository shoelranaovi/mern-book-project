import { useEffect, useState } from "react";
import Sideber from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import Profile from "../components/Profile";
import AllBooks from "../components/AllBooks";
import AllUser from "../components/AllUser";

function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const tabparams = urlPrams.get("tab");
    if (tabparams) {
      setTab(tabparams);
    }
  }, [location.search]);
  return (
    <div className="md:flex  ">
      <div className="  m-6">
        <Sideber />
      </div>
      <div> {tab === "profile" && <Profile />} </div>
      <div> {tab === "alluser" && <AllUser />} </div>
      <div> {tab === "allbooks" && <AllBooks />} </div>
    </div>
  );
}

export default Dashboard;
