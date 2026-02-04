import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const ShowApplication = () => {
  const { API } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState({}); // store temporary remark for each application

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // ✅ define an async function inside the effect
    const loadApplications = async () => {
      try {
        if (!user?.staffId) return;

        const res = await axios.get(
          `${API}/api/staff/${user.staffId}/pending`
        );
        setApplications(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array is correct here

  const handleApprove = async (appId) => {
    try {
      await axios.post(
        `${API}/api/staff/application/${appId}/approve`,
        { staffId: user.staffmongoId, remark: remarks[appId] || "" }
      );
      setRemarks((prev) => ({ ...prev, [appId]: "" }));

      // Refresh the applications list after action
      const res = await axios.get(
        `${API}/api/staff/${user.staffId}/pending`
      );
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (appId) => {
    try {
      await axios.post(
        `${API}/api/staff/application/${appId}/reject`,
        { staffId: user.staffmongoId, remark: remarks[appId] || "" }
      );
      setRemarks((prev) => ({ ...prev, [appId]: "" }));

      // Refresh the applications list after action
      const res = await axios.get(
        `${API}/api/staff/${user.staffId}/pending`
      );
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading applications...</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">
        <i className="fa-solid fa-file-circle-check me-2 text-primary"></i>
        Pending Applications
      </h3>

      {applications.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fa-solid fa-circle-info me-2"></i>
          No pending applications
        </div>
      ) : (
        <div className="row">
          {applications.map((app) => (
            <div className="col-md-6 mb-4" key={app._id}>
              <div className="card shadow-sm h-100">
                {/* Header */}
                <div className="card-header bg-light">
                  <strong>
                    <i className="fa-solid fa-user-graduate me-2"></i>
                    {app.studentId?.username}
                  </strong>
                  <span className="badge bg-secondary float-end">
                    PRN: {app.studentId?.prn}
                  </span>
                </div>

                {/* Body */}
                <div className="card-body" style={{ fontFamily: "serif" }}>
                  <p>
                    <b>To,</b>
                    <br />
                    The Dean of <b>{app.studentId?.branch}</b> Department
                  </p>

                  <p className="mt-3">
                    <b>Subject:</b> {app.subject}
                  </p>

                  <p className="mt-3">Respected Sir/Madam,</p>

                  <p style={{ textAlign: "justify" }}>
                    I am <b>{app.studentId?.username}</b> (PRN:{" "}
                    <b>{app.studentId?.prn}</b>), a student of{" "}
                    <b>{app.studentId?.branch}</b> department. I would like to
                    request leave from{" "}
                    <b>{new Date(app.fromDate).toLocaleDateString()}</b> to{" "}
                    <b>{new Date(app.toDate).toLocaleDateString()}</b>.
                  </p>

                  <p className="mt-2">
                    <b>Reason:</b>
                    <br />
                    {app.reason}
                  </p>

                  <p className="mt-3">Thanking you.</p>

                  <p className="mt-3">
                    Yours sincerely,
                    <br />
                    <b>{app.studentId?.username}</b>
                  </p>

                  {/* Teacher + Dean Remarks */}
                  {(app.teacherRemark || app.deanRemark) && (
                    <div className="mt-4 p-3 border rounded bg-light">
                      <h6 className="mb-2">
                        <i className="fa-solid fa-pen-to-square me-2"></i>
                        Remarks
                      </h6>
                      {app.teacherRemark && (
                        <p>
                          <b>Teacher:</b> {app.teacherRemark}
                        </p>
                      )}
                      {app.deanRemark && (
                        <p>
                          <b>Dean:</b> {app.deanRemark}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Input for remark */}
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-control form-control-sm fw-bold fs-4"
                      placeholder="Enter remark:(eg:- Approve for a day)"
                      value={remarks[app._id] || ""}
                      onChange={(e) =>
                        setRemarks((prev) => ({ ...prev, [app._id]: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Footer - Approve / Reject */}
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(app._id)}
                  >
                    <i className="fa-solid fa-check me-1"></i> Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleReject(app._id)}
                  >
                    <i className="fa-solid fa-xmark me-1"></i> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowApplication;
