import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatisticsCard } from "@/widgets/cards";
import { Typography } from "@material-tailwind/react";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsChartsData } from "@/data";
import { ClockIcon } from "@heroicons/react/24/solid";
import { UsersIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Contact from "@/widgets/components/contact";
import Clinic from "@/widgets/components/ClinicForm";

export function Home() {
  const [userDataLength, setUserDataLength] = useState(null);
  const [serviceDataLength, setServiceDataLength] = useState(null);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:4000/api/users/count",
      );
      console.log("User response:", userResponse.data); // Debugging: Inspect the API response

      if (userResponse.data && typeof userResponse.data.count === "number") {
        setUserDataLength(userResponse.data.count); // Use the 'count' field directly
      } else {
        console.error("Unexpected user data structure");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch service data
  const fetchServiceData = async () => {
    try {
      const serviceResponse = await axios.get(
        "http://localhost:4000/api/all-services",
      );
      console.log("Service response:", serviceResponse.data);

      if (Array.isArray(serviceResponse.data)) {
        setServiceDataLength(serviceResponse.data.length);
      } else {
        console.error("Unexpected service data structure");
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchServiceData();
  }, []);

  return (
    <>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
          <StatisticsCard
            color="gray"
            title="Total User's"
            icon={React.createElement(UsersIcon, {
              className: "w-6 h-6 text-white",
            })}
            value={userDataLength !== null ? `${userDataLength}` : ""}
            footer={null}
          />
          <StatisticsCard
            color="gray"
            title="Total Product"
            icon={React.createElement(UsersIcon, {
              className: "w-6 h-6 text-white",
            })}
            value={serviceDataLength !== null ? serviceDataLength : "0"}
            footer={null}
          />
        </div>
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon
                    strokeWidth={2}
                    className="h-4 w-4 text-blue-gray-400"
                  />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}
        </div>
      </div>
      <Contact />
      <Clinic />
    </>
  );
}

export default Home;
