import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user's cart
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/carts/getcart"); // ✅ token in cookies handles req.userId automatically
      if (res.data.success) {
        setCart(res.data.cart.products || []);
      } else {
        setError(res.data.message || "Failed to fetch cart.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error fetching cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove product from cart
  const handleRemove = async (productId) => {
    try {
      const res = await api.post("/carts/remove", { productId });
      if (res.data.success) {
        setCart(res.data.cart.products);
        setMessage("Product removed from cart.");
        setTimeout(() => setMessage(""), 1500);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error removing product.");
    }
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + (product.price || 0),
    0
  );

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>Loading cart...</p>
    );

  if (error)
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "40px" }}>
        {error}
      </p>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "24px",
            color: "#333",
          }}
        >
          My Cart
        </h2>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: "green",
              fontWeight: "500",
              marginBottom: "15px",
            }}
          >
            {message}
          </p>
        )}

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty.</p>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(clamp(220px, 30%, 300px), 1fr))",
                gap: "25px",
                justifyContent: "left",
              }}
            >
              {cart.map((product) => (
                <div
                  key={product._id}
                  style={{
                    background: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 15px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 5px rgba(0,0,0,0.05)";
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      display: "block",
                      backgroundColor: "#f3f3f3",
                    }}
                  />
                  <div style={{ padding: "15px" }}>
                    <h4
                      style={{
                        marginBottom: "8px",
                        fontSize: "18px",
                        color: "#111",
                        lineHeight: "1.3",
                      }}
                    >
                      {product.title}
                    </h4>
                    <p style={{ margin: "5px 0", color: "#555" }}>
                      <b>Category:</b> {product.category}
                    </p>
                    <p style={{ margin: "5px 0", color: "#555" }}>
                      <b>Brand:</b> {product.brand}
                    </p>
                    <p style={{ margin: "5px 0", color: "#111" }}>
                      <b>Price:</b> ₹{product.price}
                    </p>
                    <p
                      style={{
                        margin: "10px 0",
                        color: "#666",
                        fontSize: "14px",
                        minHeight: "40px",
                      }}
                    >
                      <b>Description:</b> {product.description?.slice(0, 60)}...
                    </p>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(product._id)}
                      style={{
                        width: "100%",
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "500",
                        marginTop: "10px",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div
              style={{
                marginTop: "30px",
                textAlign: "right",
                borderTop: "1px solid #ddd",
                paddingTop: "20px",
              }}
            >
              <h3 style={{ fontSize: "20px", color: "#333" }}>
                Total: ₹{totalPrice.toFixed(2)}
              </h3>
              <button
                style={{
                  marginTop: "15px",
                  background: "#32C0B7",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;
