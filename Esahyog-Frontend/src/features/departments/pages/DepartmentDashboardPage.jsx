import { useEffect, useState } from "react";
import Header from "../../../components/common/Header.jsx";
import Footer from "../../../components/common/Footer.jsx";
import DepartmentMainGrid from "../components/DepartmentMainGrid.jsx";
import { departmentConfig } from "../data/departmentConfig.jsx";
import { departmentsApi } from "../../../services/departmentsApi.js";

const DepartmentDashboardPage = ({ departmentKey }) => {
  const config = departmentConfig[departmentKey];
  const [dashboardName, setDashboardName] = useState(config?.dashboardName);

  useEffect(() => {
    const fetchDashboardMeta = async () => {
      try {
        const response =
          await departmentsApi.getDepartmentDashboard(departmentKey);
        const dashboard = response.data || response;
        setDashboardName(dashboard.dashboardName || dashboard.departmentName);
      } catch (error) {
        console.error("Failed to fetch department dashboard metadata:", error);
        setDashboardName(config?.dashboardName);
      }
    };

    fetchDashboardMeta();
  }, [config?.dashboardName, departmentKey]);

  if (!config) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-100">
        Department dashboard is not configured.
      </div>
    );
  }

  const { Hero, CitizenColumn, OperatorColumn } = config;

  return (
    <>
      <Header dashboardName={dashboardName} />
      <div className="min-h-screen bg-slate-950 p-6 font-sans">
        <div className="max-w-7xl mx-auto bg-slate-900/70 rounded-2xl shadow-2xl overflow-hidden">
          <Hero />
          <DepartmentMainGrid
            citizenColumn={CitizenColumn}
            operatorColumn={OperatorColumn}
          />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DepartmentDashboardPage;
