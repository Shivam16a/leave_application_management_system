import React, { useEffect, useState } from "react";
import axios from "axios";

const Application = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Logged-in student
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    reason: "",
    fromDate: "",
    toDate: "",
  });

  // 🔁 Fetch student's applications
  const fetchApplications = async () => {
    if (!user?.studentId) return;
    try {
      const res = await axios.get(
        `http://localhost:5500/api/application/${user.studentId}`
      );
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✍️ Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📤 Submit new application
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.studentId) {
      alert("User not found. Please login first.");
      return;
    }

    const { subject, reason, fromDate, toDate } = formData;
    if (!subject || !reason || !fromDate || !toDate) {
      alert("Please fill all fields.");
      return;
    }

    const payload = {
      studentId: user.studentId, // ✅ backend ke schema ke liye
      subject,
      reason,
      fromDate,
      toDate,
    };

    try {
      const res = await axios.post(
        "http://localhost:5500/api/application/submit",
        payload
      );
      alert("Application submitted successfully!");
      setFormData({ subject: "", reason: "", fromDate: "", toDate: "" });
      fetchApplications(); // Refresh the list after submit
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">📄 Leave Application</h3>

      {/* 📝 Application Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Reason</label>
            <textarea
              className="form-control"
              name="reason"
              rows="3"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      </div>

      {/* 📋 Application List */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">📂 My Applications</h5>

        {applications.length === 0 ? (
          <p>No applications submitted yet.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Reason</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Teacher Remark</th>
                <th>Dean Remark</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.subject}</td>
                  <td>{app.reason}</td>
                  <td>{new Date(app.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(app.toDate).toLocaleDateString()}</td>
                  <td>{app.status}</td>
                  <td>{app.teacherRemark || "-"}</td>
                  <td>{app.deanRemark || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Application;
