import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/seller/seller-orders");

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        setError(res.data.message || "Failed to load orders.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container py-4" style={{ maxWidth: "1200px" }}>
      <h2 className="text-center fw-bold mb-4">Seller Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center mt-4 fw-semibold">
          No orders found for your products.
        </p>
      ) : (
        <>
          {orders.map((order) => (
            <div className="card mb-4 shadow-sm border-0" key={order._id}>
              <div className="card-body">
                {/* Order Header */}
                <div className="d-flex justify-content-between flex-wrap mb-2">
                  <h5 className="fw-bold">Order ID: {order._id}</h5>
                  <p className="text-muted small mb-0">
                    Buyer User ID: {order.user}
                  </p>
                </div>

                <hr />

                {/* Order Products */}
                {order.products.map((item) => (
                  <div
                    key={item._id}
                    className="row align-items-center py-3 border-bottom"
                  >
                    {/* Product Image */}
                    <div className="col-12 col-md-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="img-fluid rounded"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="col-12 col-md-9 mt-3 mt-md-0">
                      <h5 className="fw-bold">{item.product.title}</h5>

                      <p className="mb-1">
                        <b>Quantity:</b> {item.quantity}
                      </p>

                      <p className="mb-1">
                        <b>Price:</b> ₹{item.product.price}
                      </p>

                      <p className="fw-bold mt-2">
                        Subtotal: ₹{item.quantity * item.product.price}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <h4 className="text-end mt-3 fw-bold">
                  Total: ₹{order.totalPrice}
                </h4>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SellerOrders;
