import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const MyCart = () => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/carts/getcart");

      if (res.data.success) {
        setItems(res.data.cart);
        setTotalPrice(res.data.totalPrice);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const res = await api.post("/carts/remove", { productId });

      if (res.data.success) {
        setItems(res.data.cart.items);
        setTotalPrice(res.data.totalPrice);
        setMessage("Item removed");
        setTimeout(() => setMessage(""), 1500);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error removing item.");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await api.get("/order/placeorder");

      if (res.data.success) {
        setMessage("Order placed!");
        setItems([]);
        setTotalPrice(0);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (error)
    return <p className="text-center mt-5 text-danger fw-bold">{error}</p>;

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">My Cart</h2>

      {message && <p className="text-center text-success fw-bold">{message}</p>}

      {items?.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          {/* LEFT SIDE – CART ITEMS */}
          <div className="col-lg-8">
            {items?.map((item) => (
              <div
                key={item._id}
                className="card mb-3 border-0 shadow-sm"
                style={{ borderRadius: "14px" }}
              >
                <div className="row g-0 align-items-center">
                  {/* RESPONSIVE IMAGE */}
                  <div className="col-12 col-md-4">
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="img-fluid rounded-start w-100"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* RESPONSIVE DETAILS */}
                  <div className="col-12 col-md-8">
                    <div className="card-body">
                      <h5 className="fw-bold">{item.product.title}</h5>

                      <p className="text-muted mb-1">
                        Quantity: <b>{item.quantity}</b>
                      </p>

                      <p className="fw-semibold fs-6">
                        ₹{item.product.price} × {item.quantity} ={" "}
                        <span className="text-primary fw-bold">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </p>

                      <button
                        onClick={() => handleRemove(item.product._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE – ORDER SUMMARY */}
          <div className="col-lg-4">
            <div
              className="card shadow-sm p-3 border-0"
              style={{ borderRadius: "14px" }}
            >
              <h4 className="fw-bold mb-3">Order Summary</h4>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">₹{totalPrice}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Delivery</span>
                <span className="text-success fw-bold">FREE</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary w-100 mt-3 py-2"
                style={{ borderRadius: "10px" }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
