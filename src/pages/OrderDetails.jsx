import React, { useEffect, useState } from 'react';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/order-details")   // 👈 your real API endpoint
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching order:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading...</h3>;
  if (!order) return <h3>No order found</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>

      {/* Order Summary */}
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <tbody>
          <tr><th>Order ID</th><td>{order.orderId}</td></tr>
          <tr><th>Customer</th><td>{order.customer}</td></tr>
          <tr><th>Date</th><td>{order.date}</td></tr>
          <tr><th>Status</th><td>{order.status}</td></tr>
          <tr><th>Total</th><td>{order.total}</td></tr>
        </tbody>
      </table>

      {/* Items Table */}
      <h3 style={{ marginTop: "30px" }}>Items</h3>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
