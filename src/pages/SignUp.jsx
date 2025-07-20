import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Save login state
    localStorage.setItem("isAuthenticated", "true");

    alert("Sign up successful!");
    navigate("/"); // Go to home
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <input
          style={styles.input}
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <div style={styles.passwordWrapper}>
          <input
            style={styles.input}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleBtn}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <input
          style={styles.input}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p style={styles.error}>{errors.confirmPassword}</p>
        )}

        <button style={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "2rem",
    fontSize: "2rem",
    color: "#e63946",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "0.5rem",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #aaa",
    borderRadius: "8px",
  },
  button: {
    marginTop: "1rem",
    padding: "0.8rem",
    backgroundColor: "#e63946",
    color: "white",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "0.85rem",
    marginTop: "-0.3rem",
    marginBottom: "0.3rem",
  },
  passwordWrapper: {
    position: "relative",
  },
  toggleBtn: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    color: "#e63946",
    cursor: "pointer",
  },
};
export default SignUp;
