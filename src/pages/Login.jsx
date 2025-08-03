import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [passhandle, setPasshandle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!userData.email) newErrors.email = "Email is required";
    if (!userData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    alert("Login Successful");
    setUserData({ email: "", password: "" });
    setError({});
    setPasshandle(false);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
          <label>Email:</label>
          <input
            name="email"
            value={userData.email}
            onChange={handleChange}
            type="email"
            style={{ width: "95%", padding: "8px" }}
          />
          {error.email && (
            <p style={{ color: "red", fontSize: "0.9em" }}>{error.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: "12px", textAlign: "left" }}>
          <label>Password:</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              name="password"
              value={userData.password}
              onChange={handleChange}
              type={passhandle ? "text" : "password"}
              style={{ flex: 1, padding: "8px" }}
            />
            <button
              type="button"
              onClick={() => setPasshandle((prev) => !prev)}
            >
              {passhandle ? "Hide" : "Show"}
            </button>
          </div>
          {error.password && (
            <p style={{ color: "red", fontSize: "0.9em" }}>{error.password}</p>
          )}
        </div>

        <input
          type="submit"
          value="Login"
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

export default Login;
