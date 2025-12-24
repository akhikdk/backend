import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../CartStore";

function Proceed() {
  const navigate = useNavigate();
  const { cartItems, clearCart, getTotal } = useCartStore();
  const [loading, setLoading] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/", { replace: true });
    }
  }, [cartItems, navigate]);

  if (!cartItems || cartItems.length === 0) return null;

  // ---------------------------
  // Price calculations (memoized)
  // ---------------------------
  const { subtotal, gst, deliveryFee, total } = useMemo(() => {
    const sub = getTotal();
    const tax = Math.round(sub * 0.18);
    const delivery = 50;
    return {
      subtotal: sub,
      gst: tax,
      deliveryFee: delivery,
      total: sub + tax + delivery
    };
  }, [cartItems, getTotal]);

  // ---------------------------
  // Handle Order
  // ---------------------------
  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      if (!cartItems || cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      const orderPayload = {
        customer: "John Doe",       // replace with actual customer info if available
        orderId: Date.now(),
        status: "pending",
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.title,
          qty: Number(item.qty),
          price: Number(item.price)
        }))
      };

      // Backend calculates total itself, so no need to send subtotal/gst/delivery
      const response = await fetch("http://localhost:8000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to place order");
      }

      await response.json();
      alert("Order placed successfully!");
      clearCart();
      navigate("/", { replace: true });

    } catch (error) {
      console.error("Order Error:", error);
      alert("Error placing order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">

        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-yellow-300 mb-8">
          Order Summary
        </h1>

        {/* Order Items */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-800 rounded-2xl border border-gray-700 space-y-3">
            <h3 className="text-lg font-semibold text-yellow-300">Your Order</h3>

            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-700 rounded-xl">
                {item.image && <img src={item.image} alt={item.title} className="w-12 h-12 object-contain rounded" />}
                <div className="flex-1 text-gray-200">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-400 text-sm">Qty: {item.qty} | ₹{item.price} each</p>
                </div>
                <p className="text-yellow-300 font-bold">₹{item.price * item.qty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="mt-6 p-6 bg-gray-800 rounded-2xl border border-gray-700">
          <div className="flex justify-between text-gray-300 mb-2"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between text-gray-300 mb-2"><span>GST (18%)</span><span>₹{gst}</span></div>
          <div className="flex justify-between text-gray-300 mb-4"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
          <div className="flex justify-between text-yellow-300 text-2xl font-bold"><span>Total</span><span>₹{total}</span></div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-xl text-black font-bold transition-transform
            ${loading ? "bg-yellow-400 opacity-50 cursor-not-allowed" : "bg-gradient-to-r from-yellow-500 to-yellow-300 hover:scale-105"}`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>
    </div>
  );
}

export default Proceed;
