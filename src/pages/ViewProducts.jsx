import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get("/seller/getproducts");
      if (res.data.success) {
        setProducts(res.data.products);
        setSeller(res.data.seller);
      } else {
        setError(res.data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/seller/deleteproducts/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      category: product.category,
      brand: product.brand,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });

    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    if (!form.title || !form.price) {
      alert("Title and price required");
      return;
    }

    try {
      await api.put(`/seller/editproducts/${editingProduct._id}`, form);

      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? { ...p, ...form } : p))
      );

      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">My Products</h2>

      {seller && (
        <div className="alert alert-info mb-4">
          <h5 className="fw-bold mb-2">Seller Information</h5>
          <p className="mb-1">
            <b>Name:</b> {seller.name}
          </p>
          <p className="mb-0">
            <b>Email:</b> {seller.email}
          </p>
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-center fw-semibold">No products found.</p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={product._id}
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                  alt={product.title}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{product.title}</h5>

                  <p className="mb-1">
                    <b>Category:</b> {product.category}
                  </p>
                  <p className="mb-1">
                    <b>Brand:</b> {product.brand}
                  </p>
                  <p className="mb-1">
                    <b>Price:</b> ₹{product.price}
                  </p>
                  <p className="mb-1">
                    <b>Stock:</b> {product.stock}
                  </p>

                  <p className="text-muted small mt-2">
                    {product.description.slice(0, 50)}...
                  </p>

                  <p className="text-muted small">
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PURE REACT MODAL */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "400px" }}
          >
            <h5 className="mb-3">Edit Product</h5>

            <div className="mb-2">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Category</label>
              <input
                className="form-control"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Brand</label>
              <input
                className="form-control"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
