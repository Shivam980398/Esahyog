import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { departmentList } from "../features/departments/data/departmentConfig.jsx";

import HeroSection from "../components/dashboard/HeroSection";
import { departmentsApi } from "../services/departmentsApi";

const Dashboard = () => {
  const [departments, setDepartments] = useState(departmentList);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentsApi.getDepartments();
        const dynamicDepartments = response.data || response;

        if (Array.isArray(dynamicDepartments) && dynamicDepartments.length) {
          setDepartments(dynamicDepartments);
        }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const departmentCards = useMemo(
    () =>
      departments.map((department) => {
        const configuredDepartment = departmentList.find(
          (item) => item.key === department.key,
        );

        return {
          ...configuredDepartment,
          ...department,
          departmentLogo:
            department.departmentLogo || configuredDepartment?.departmentLogo,
        };
      }),
    [departments],
  );

  return (
    <div>
      <Header dashboardName="Connect to Smart City" />
      <HeroSection />

      <main className="bg-slate-100 py-10">
        <div className="mx-auto max-w-6xl flex flex-col justify-between items-center gap-6 px-4 md:grid md:grid-cols-3 lg:grid-cols-4 ">
          {departmentCards.map((elem, idx) => (
            <div key={idx} className="flex justify-center">
              <Card
                company={elem.departmentName}
                officeTime={elem.officeTime}
                title={elem.title}
                statusTag1={elem.statusTag1}
                departmentLogo={elem.departmentLogo}
                duration={elem.duration}
                statusTag2={elem.statusTag2}
                location={elem.location}
                route={elem.route}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
