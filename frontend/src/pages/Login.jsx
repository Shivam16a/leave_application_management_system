import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const studenturl = "http://localhost:5500/api/user/login";
const staffurl = "http://localhost:5500/api/staff/login";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    prn: "",
    staffId: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = role === "student" ? studenturl : staffurl;

    const payload =
      role === "student"
        ? { prn: formData.prn, password: formData.password }
        : { staffId: formData.staffId, password: formData.password };

    try {
      const res = await axios.post(url, payload);
      if (role === "staff") {
        localStorage.setItem("user", JSON.stringify(res.data.staff));
      }

      if (role === "student") {
        localStorage.setItem("user", JSON.stringify(res.data.student));
        localStorage.setItem("role", "student");
      }
      console.log(res.data);
      alert(`${role} login successful`);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "380px" }}>

        <h3 className="text-center mb-3">
          <i className="fa fa-sign-in-alt me-2"></i>
          Login in Yachika
        </h3>

        {/* Role Selection */}
        <div className="mb-3">
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PRN / Staff ID */}
          <div className="mb-3">
            <label className="form-label">
              {role === "student" ? "PRN" : "Staff ID"}
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-id-card"></i>
              </span>
              <input
                type="text"
                className="form-control"
                name={role === "student" ? "prn" : "staffId"}
                autoComplete="off"
                placeholder={`Enter ${role === "student" ? "PRN" : "Staff ID"}`}
                value={
                  role === "student"
                    ? formData.prn
                    : formData.staffId
                }
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                name="password"
                autoComplete="off"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="fa fa-arrow-right me-2"></i>
            Login as {role}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
