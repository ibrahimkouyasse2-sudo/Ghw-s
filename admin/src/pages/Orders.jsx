import React, { useEffect, useState } from "react";
import adminAxios from "../utils/adminAxios"; // ✅ IMPORTANT
import { currency } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // ================= FETCH ALL ORDERS =================
  const fetchAllOrders = async () => {
    try {
      const res = await adminAxios.post("/api/order/list");

      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  };

  // ================= UPDATE ORDER STATUS =================
  const handleStatus = async (e, orderId) => {
    try {
      const res = await adminAxios.post("/api/order/status", {
        orderId,
        status: e.target.value,
      });

      if (res.data.success) {
        fetchAllOrders();
        toast.success("Order status updated");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update status"
      );
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <main>
      <h1 className="text-xl font-semibold mb-4">Orders</h1>

      <div>
        {orders.map((order, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]
              gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcel" />

            {/* ITEMS + ADDRESS */}
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="py-0.5 text-orange-500">
                  {item.name} x {item.quantity} <span>{item.size}</span>
                </p>
              ))}

              <p className="mt-3 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* META */}
            <div>
              <p>Items: {order.items.length}</p>
              <p className="mt-2">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* AMOUNT */}
            <p className="text-sm sm:text-lg font-semibold">
              {order.amount} {currency}
            </p>

            {/* STATUS */}
            <select
              value={order.status}
              onChange={(e) => handleStatus(e, order._id)}
              className="p-2 font-semibold border"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Orders;
