import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  const categories = ["shoes", "shirts", "t-shirts", "jeans"];

  // Fetch products with optional filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = "";

      if (selectedCategories.length > 0) {
        query = `?category=${selectedCategories.join(",")}`;
      }

      const res = await api.get(`/products/getallfilterproducts${query}`);
      if (res.data.success) {
        setProducts(res.data.products);
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

  // Fetch on mount and whenever selectedCategories changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategories]);

  // Handle category checkbox toggle
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Handle Add to Cart (auth required)
  const handleAddToCart = async (productId) => {
    try {
      const res = await api.post("/carts/add", { productId }); // ✅ userId from JWT token automatically
      if (res.data.success) {
        setCartMessage(res.data.message || "Added to cart!");
        setTimeout(() => setCartMessage(""), 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        alert("Please log in to add items to your cart.");
      } else {
        alert(error.response?.data?.message || "Error adding to cart");
      }
    }
  };

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
          All Products
        </h2>

        {/* Category Filter */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          {categories.map((category) => (
            <label
              key={category}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#f9f9f9",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                style={{ transform: "scale(1.2)" }}
              />
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                {category}
              </span>
            </label>
          ))}
        </div>

        {/* Cart Message */}
        {cartMessage && (
          <p
            style={{
              textAlign: "center",
              color: "green",
              fontWeight: "500",
              marginBottom: "15px",
            }}
          >
            {cartMessage}
          </p>
        )}

        {/* Product Grid */}
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

                  {/* ✅ Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    style={{
                      width: "100%",
                      background: "#32C0B7",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      marginTop: "10px",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllProducts;
