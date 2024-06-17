import { useState, useEffect } from "react";
import axios from "axios";

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
              const response = await axios.get("/user/orderHistory");
              
              const orderHistory = response.data;
              
              // Function to format the date
              const formatDate = (dateStr) => {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateStr).toLocaleDateString(undefined, options);
              };
          
              // Function to check if the plan is active
              const isActive = (expiryDateStr) => {
                const currentDate = new Date();
                const expiryDate = new Date(expiryDateStr);
                return currentDate <= expiryDate;
              };
          
              // Process the order history
              orderHistory.forEach((order) => {
                order.purchaseDate = formatDate(order.purchaseDate);
                order.status = isActive(order.expiryDate) ? 'Active' : 'Expired';
      
              })
          
              setOrderHistory(orderHistory);
              // console.log(processedOrderHistory);
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchOrderHistory();
      }, []);

    return (
        <div className="mb-6 p-3">
          <div className="flex items-center mb-6">
            <img
              src={user?.picture}
              alt="User Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            {/* <button className="ml-auto bg-blue-600 text-white py-2 px-4 rounded-lg">
              Upgrade Plan
            </button> */}
          </div>
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <div className="space-y-4">
            {orderHistory.map((order, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">{order.plan} Plan</h3>
                <p>Date: {order.purchaseDate}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </div>
    )
}

export default OrderHistory