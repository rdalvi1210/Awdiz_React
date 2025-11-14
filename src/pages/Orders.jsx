import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/order/myorders");

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        setError(res.data.message || "Failed to load orders.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error loading orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return <p className="text-center mt-5 fs-5">Loading orders...</p>;

  if (error)
    return <p className="text-center mt-5 text-danger fw-semibold">{error}</p>;

  return (
    <div className="container py-4" style={{ maxWidth: "1050px" }}>
      <h2 className="text-center fw-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center mt-5 fs-5">No orders found.</p>
      ) : (
        <>
          {orders.map((order) => (
            <div
              key={order._id}
              className="card shadow-sm mb-4 border-0"
              style={{ borderRadius: "14px" }}
            >
              <div className="card-body">
                {/* ORDER HEADER */}
                <div className="d-flex justify-content-between flex-wrap mb-3">
                  <h5 className="fw-bold">
                    Order ID: <span className="text-primary">{order._id}</span>
                  </h5>

                  <p className="text-muted mb-0">
                    Ordered on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <hr />

                {/* ORDER ITEMS */}
                {order.products.map((item) => (
                  <div key={item._id} className="row py-3 border-bottom">
                    {/* IMAGE */}
                    <div className="col-12 col-md-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        className="img-fluid rounded"
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="col-12 col-md-9 mt-3 mt-md-0">
                      <h5 className="fw-bold">{item.product.title}</h5>

                      <p className="mb-1">
                        <b>Qty:</b> {item.quantity}
                      </p>

                      <p className="mb-1">
                        <b>Price:</b> ₹{item.product.price} × {item.quantity}
                      </p>

                      <p className="fw-bold mt-2">
                        Subtotal: ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                {/* TOTAL PRICE */}
                <h4 className="text-end fw-bold mt-3">
                  Total: ₹{order.totalPrice.toFixed(2)}
                </h4>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MyOrders;
