import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

const ClinicOrder = () => {
  const [clinicOrders, setClinicOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Fetch clinic orders from API
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/get-clinic-orders")
      .then((response) => {
        setClinicOrders(response.data.data); // Assuming "data" contains the orders
      })
      .catch((error) => console.error("Error fetching clinic orders:", error));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Handle sorting order change
  const handleSortOrderChange = (selectedValue) => {
    setSortOrder(selectedValue);
  };

  // Filter and sort orders
  const filteredAndSortedOrders = clinicOrders
    .filter((order) => {
      return (
        order.animal_type.toLowerCase().includes(searchQuery) ||
        order.description.toLowerCase().includes(searchQuery) ||
        order.phone_number.toLowerCase().includes(searchQuery)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredAndSortedOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Clinic Orders Table
          </Typography>
        </CardHeader>
        <div className="flex flex-col md:flex-row gap-4 p-6">
          <Input
            type="text"
            label="Search by Animal Type, Description, or Phone"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
          />
          <Select
            label="Sort Order"
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="w-full border-t-0 md:border-t"
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Order ID",
                  "Animal Type",
                  "Description",
                  "Phone Number",
                  "Reservation Time",
                  "Status",
                  "Location",
                  "Need Driver",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b border-gray-200 py-3 px-12 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-gray-600"
                    >
                      {header}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.id}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.animal_type}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.description}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.phone_number}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {new Date(order.reservation_time).toLocaleString()}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.status}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.location}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.need_driver ? "Yes" : "No"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-3 px-12">
                    <Typography className="text-xs font-normal text-gray-500">
                      No orders available.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ClinicOrder;
