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

const AdoptionOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/adoption-orders")
      .then((response) => {
        setOrders(response.data.adoptionOrders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSortOrderChange = (selectedValue) => {
    setSortOrder(selectedValue);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:4000/api/adoption-orders/${orderId}/status`,
        {
          status: newStatus,
        },
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  const filteredAndSortedOrders = orders
    .filter((order) => {
      return (
        order.name.toLowerCase().includes(searchQuery) ||
        order.email.toLowerCase().includes(searchQuery)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

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
            Adoption Orders Table
          </Typography>
        </CardHeader>
        <div className="flex flex-col md:flex-row gap-4 p-6">
          <Input
            type="text"
            label="Search by Name or Email"
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
                  "Name",
                  "Email",
                  "Phone",
                  "Status",
                  "Pet Name",
                  "Category",
                  "Created At",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b border-gray-200 py-3 px-12 text-left" // Increased px for more spacing
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
                      {order.name}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.email}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.phone_number}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.status}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.adoption.name}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {order.adoption.category}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-12 border-b border-gray-200">
                      <select
                        onChange={(e) =>
                          handleUpdateStatus(order.id, e.target.value)
                        }
                        className="text-xs font-normal text-gray-600 py-1 px-3 rounded border border-gray-300"
                        defaultValue={order.status}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-3 px-12">
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

export default AdoptionOrder;
