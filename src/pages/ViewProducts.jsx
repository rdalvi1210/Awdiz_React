import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    brand: "",
    price: "",
    description: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/getproducts");
      if (res.data.success) {
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

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/products/deleteproducts/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  // Handle Edit Click
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      category: product.category,
      brand: product.brand,
      price: product.price,
      description: product.description,
    });
  };

  // Handle Edit Save
  const handleSaveEdit = async () => {
    if (!form.title.trim() || !form.price) {
      alert("Title and price are required");
      return;
    }
    try {
      const res = await api.put(
        `/products/editproducts/${editingProduct._id}`,
        form
      );
      if (res.data.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingProduct._id ? { ...p, ...form } : p
          )
        );
        setEditingProduct(null);
      } else {
        alert(res.data.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating product");
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

                  {/* Edit / Delete Buttons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "12px",
                    }}
                  >
                    <button
                      onClick={() => handleEditClick(product)}
                      style={{
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      style={{
                        background: "#dc3545",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <h3 style={{ marginBottom: "15px", textAlign: "center" }}>
              Edit Product
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <input
                placeholder="Brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={handleSaveEdit}
                style={{
                  background: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                style={{
                  background: "#6c757d",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
