import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/getproducts");
      if (res.data.success) {
        console.log(res.data);
        setProducts(res.data.products);
        setSeller(res.data.seller);
      } else {
        setError(res.data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>;

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
          My Products
        </h2>

        {seller && (
          <div
            style={{
              marginBottom: "30px",
              padding: "15px",
              background: "#f0f7ff",
              borderRadius: "8px",
              border: "1px solid #d0e3ff",
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#333" }}>
              Seller Information
            </h3>
            <p style={{ margin: "5px 0" }}>
              <b>Name:</b> {seller.name}
            </p>
            <p style={{ margin: "5px 0" }}>
              <b>Email:</b> {seller.email}
            </p>
          </div>
        )}

        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(clamp(220px, 30%, 300px), 1fr))",
              gap: "25px",
              justifyContent: "left",
            }}
          >
            {products.map((product) => (
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
                    <b>Description:</b> {product.description.slice(0, 60)}...
                  </p>
                  <p
                    style={{
                      margin: "5px 0",
                      color: "#999",
                      fontSize: "13px",
                    }}
                  >
                    <small>
                      Added on:{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProducts;
