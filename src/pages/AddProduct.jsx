import { useState } from "react";
import api from "../axios/AxiosInstance";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    imageUrl: "",
    brand: "",
    description: "",
    price: "",
    stock: "", // 🔥 required field
  });

  const [error, setError] = useState({});

  const categories = ["shoes", "shirts", "t-shirts", "jeans"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!productData.title) newErrors.title = "Title is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (!productData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!productData.brand) newErrors.brand = "Brand is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.stock && productData.stock !== 0)
      newErrors.stock = "Stock is required";
    if (!productData.description)
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const res = await api.post(
        "http://localhost:3000/api/v1/seller/addProducts",
        productData
      );

      if (res.data.success) {
        alert(res.data.message || "Product added successfully");

        // Reset form
        setProductData({
          title: "",
          category: "",
          imageUrl: "",
          brand: "",
          description: "",
          price: "",
          stock: "",
        });

        setError({});
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value,
    });

    setError((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid black",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div style={{ marginBottom: "12px" }}>
          <label>Title:</label>
          <input
            name="title"
            value={productData.title}
            onChange={handleChange}
            type="text"
            style={{ width: "95%", padding: "8px" }}
          />
          {error.title && <p style={{ color: "red" }}>{error.title}</p>}
        </div>

        {/* Category */}
        <div style={{ marginBottom: "12px" }}>
          <label>Category:</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            style={{ width: "95%", padding: "8px" }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {error.category && <p style={{ color: "red" }}>{error.category}</p>}
        </div>

        {/* Brand */}
        <div style={{ marginBottom: "12px" }}>
          <label>Brand:</label>
          <input
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            type="text"
            style={{ width: "95%", padding: "8px" }}
          />
          {error.brand && <p style={{ color: "red" }}>{error.brand}</p>}
        </div>

        {/* Image URL */}
        <div style={{ marginBottom: "12px" }}>
          <label>Image URL:</label>
          <input
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            type="text"
            style={{ width: "95%", padding: "8px" }}
          />
          {error.imageUrl && <p style={{ color: "red" }}>{error.imageUrl}</p>}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "12px" }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="3"
            style={{ width: "95%", padding: "8px" }}
          ></textarea>
          {error.description && (
            <p style={{ color: "red" }}>{error.description}</p>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: "12px" }}>
          <label>Price:</label>
          <input
            name="price"
            value={productData.price}
            onChange={handleChange}
            type="number"
            step="0.01"
            style={{ width: "95%", padding: "8px" }}
          />
          {error.price && <p style={{ color: "red" }}>{error.price}</p>}
        </div>

        {/* Stock */}
        <div style={{ marginBottom: "12px" }}>
          <label>Stock:</label>
          <input
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            type="number"
            min="0"
            style={{ width: "95%", padding: "8px" }}
          />
          {error.stock && <p style={{ color: "red" }}>{error.stock}</p>}
        </div>

        {/* Submit */}
        <input  
          type="submit"
          value="Submit"
          style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
};

export default ProductForm;
