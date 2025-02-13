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

const ProductOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/all-orders") // Fetch orders from the backend
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSortOrderChange = (selectedValue) => {
    setSortOrder(selectedValue);
  };

  const filteredAndSortedOrders = orders
    .filter((order) => {
      const { user, status } = order;
      return (
        user.name.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery)
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

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:4000/api/orders/${orderId}/status`, {
        status,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Orders Table
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
                  "User Name",
                  "User Email",
                  "Status",
                  "Created At",
                  "Updated At",
                  "Products",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {header}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => {
                  const {
                    orderId,
                    user,
                    status,
                    createdAt,
                    updatedAt,
                    products,
                  } = order;
                  const createdAtDate = new Date(createdAt).toLocaleString();
                  const updatedAtDate = new Date(updatedAt).toLocaleString();

                  return (
                    <tr key={orderId}>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {orderId}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {user.name}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {user.email}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {status}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {createdAtDate}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {updatedAtDate}
                        </Typography>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        {products.map((product) => (
                          <div
                            key={product.productId}
                            className="flex items-center gap-2"
                          >
                            <img
                              src={`http://localhost:4000/${product.image}`}
                              alt={product.title}
                              className="w-12 h-12 object-cover"
                            />
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {product.title} - ${product.price}
                            </Typography>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <select
                          onChange={(e) =>
                            handleUpdateStatus(orderId, e.target.value)
                          }
                          className="text-xs font-normal text-blue-gray-600 py-1 px-3 rounded border border-gray-300"
                          defaultValue={status} // Set the initial value of the select to the current order's status
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-3 px-5">
                    <Typography className="text-xs font-normal text-blue-gray-500">
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

export default ProductOrder;
