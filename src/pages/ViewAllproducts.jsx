import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  const [quantities, setQuantities] = useState({});

  const categories = ["shoes", "shirts", "t-shirts", "jeans"];

  const fetchProducts = async () => {
    try {
      setLoading(true);

      let query = "";
      if (selectedCategories.length > 0) {
        query = `?category=${selectedCategories.join(",")}`;
      }

      const res = await api.get(`/products/getallfilterproducts${query}`);

      if (res.data.success) {
        const list = res.data.products;
        setProducts(list);

        setQuantities((prev) => {
          const updated = { ...prev };
          list.forEach((p) => {
            if (!updated[p._id]) updated[p._id] = 1;
          });
          return updated;
        });
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
  }, [selectedCategories]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleQtyChange = (productId, qty) => {
    qty = Number(qty);
    if (qty < 1 || qty > 10) return;

    setQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
  };

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 1;

    try {
      const res = await api.post("/carts/add", { productId, quantity });

      if (res.data.success) {
        setCartMessage(`Added ${quantity} item(s) to cart`);
        setTimeout(() => setCartMessage(""), 2000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Please log in to add items to your cart.");
      } else {
        alert(error.response?.data?.message || "Error adding to cart");
      }
    }
  };

  if (loading)
    return <p className="text-center mt-4 fw-semibold">Loading...</p>;

  if (error)
    return <p className="text-center text-danger mt-4 fw-semibold">{error}</p>;

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4">All Products</h2>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <label
            key={category}
            className="d-flex align-items-center gap-2 border rounded px-3 py-2"
            style={{ cursor: "pointer", background: "#fafafa" }}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <span className="fw-semibold">{category}</span>
          </label>
        ))}
      </div>

      {cartMessage && (
        <p className="text-center text-success fw-bold">{cartMessage}</p>
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
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  style={{
                    height: "230px",
                    objectFit: "cover",
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
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

                  <p className="small text-muted mt-2">
                    {product.description.slice(0, 50)}...
                  </p>

                  {/* Quantity */}
                  <div className="mt-auto">
                    <label className="fw-semibold">Qty: </label>
                    <select
                      className="ms-2 px-2 py-1 rounded border"
                      value={quantities[product._id] || 1}
                      onChange={(e) =>
                        handleQtyChange(product._id, e.target.value)
                      }
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (qty) => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        )
                      )}
                    </select>

                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={() => handleAddToCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllProducts;
