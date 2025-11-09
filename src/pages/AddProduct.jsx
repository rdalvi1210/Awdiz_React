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
    inStock: true,
    rating: "",
  });

  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!productData.title) newErrors.title = "Title is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (!productData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!productData.brand) newErrors.brand = "Brand is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.description)
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const res = await api.post(
        "http://localhost:3000/api/v1/products/addproducts",
        productData
      );

      if (res.data.success) {
        alert(res.data.message || "Product added successfully");
        setProductData({
          title: "",
          category: "",
          imageUrl: "",
          brand: "",
          description: "",
          price: "",
          inStock: true,
          rating: "",
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
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError({ ...error, [name]: "" });
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
        {/* Title Field */}
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
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

        {/* Category Field */}
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
          <label>Category:</label>
          <input
            name="category"
            value={productData.category}
            onChange={handleChange}
            type="text"
            style={{ width: "95%", padding: "8px" }}
          />
          {error.category && <p style={{ color: "red" }}>{error.category}</p>}
        </div>

        {/* Brand Field */}
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
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

        {/* Image URL Field */}
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
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

        {/* Description Field */}
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="3"
            style={{ width: "95%", padding: "8px", resize: "none" }}
          ></textarea>
          {error.description && (
            <p style={{ color: "red" }}>{error.description}</p>
          )}
        </div>

        {/* Price Field */}
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
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

        {/* Submit Button */}
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
