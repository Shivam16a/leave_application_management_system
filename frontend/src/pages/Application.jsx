import React, { useEffect, useState } from "react";
import axios from "axios";

const Application = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Logged-in student
    const [applications, setApplications] = useState([]);
    const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    //Allowed submit application
    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const hour = now.getHours();

            if (hour >= 9 && hour < 21) {
                setIsSubmitAllowed(true);
            } else {
                setIsSubmitAllowed(false);
            }
        };

        checkTime();

        const interval = setInterval(checkTime, 60000);
        return () => clearInterval(interval);
    }, []);


    // 📤 Submit new application
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { subject, reason, fromDate, toDate } = formData;
        if (!subject || !reason || !fromDate || !toDate) {
            alert("Please fill all fields.");
            return;
        }

        try {
            await axios.post("http://localhost:5500/api/application/submit", {
                studentId: user.studentId,
                subject,
                reason,
                fromDate,
                toDate,
            });
            alert("Application submitted successfully!");
            setFormData({ subject: "", reason: "", fromDate: "", toDate: "" });
            fetchApplications();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    // 🔹 Helper function for badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case "pending_teacher":
            case "pending_dean":
                return "badge bg-warning text-dark";
            case "approved":
                return "badge bg-success text-white";
            case "rejected_by_teacher":
            case "rejected_by_dean":
                return "badge bg-danger text-white";
            default:
                return "badge bg-secondary";
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4 text-center">
                <i className="fa-solid fa-file-circle-check me-2 text-primary"></i>
                Leave Applications
            </h3>

            {/* 📝 Application Form */}
            <div className="card p-4 mb-4 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            name="subject"
                            autoComplete="off"
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

                    <button type="submit" className="btn btn-primary" disabled={!isSubmitAllowed}>
                        Submit Application
                    </button>
                    {!isSubmitAllowed && (
                        <p className="text-denger mt-2">
                            (You can submit applications only between 9:00 AM and 9:00 PM.)
                        </p>
                    )}
                </form>
            </div>

            {/* 📄 Applications in Letter Format */}
            <div className="row">
                {applications.length === 0 ? (
                    <p className="text-center">No applications submitted yet.</p>
                ) : (
                    applications.map((app) => (
                        <div className="col-md-6 mb-4" key={app._id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-header bg-light">
                                    <strong>
                                        <i className="fa-solid fa-user-graduate me-2"></i>
                                        {user.name}
                                    </strong>
                                    <span className="badge bg-secondary float-end">
                                        PRN: {user.prn}
                                    </span>
                                </div>

                                <div className="card-body" style={{ fontFamily: "serif" }}>

                                    <p>
                                        <b>To,</b>
                                        <br />
                                        The Dean of <b>{user.branch}</b> Department
                                    </p>

                                    <p className="mt-3">
                                        <b>Subject:</b> {app.subject}
                                    </p>

                                    <p className="mt-3">Respected Sir/Madam,</p>

                                    <p style={{ textAlign: "justify" }}>
                                        I am <b>{user.name}</b> (PRN: <b>{user.prn}</b>), a
                                        student of <b>{user.branch}</b> department. I would like to
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
                                        <b>{user.name}</b>
                                    </p>

                                    {/* 🔹 Status Badges */}
                                    <div className="mb-3">
                                        <span className={getStatusBadge(app.teacherstatus)}>
                                            Teacher: {app.teacherstatus.replace(/_/g, " ")}
                                        </span>{" "}
                                        <span className={getStatusBadge(app.deanstatus)}>
                                            Dean: {app.deanstatus.replace(/_/g, " ")}
                                        </span>
                                    </div>
                                    {/* Remarks Section */}
                                    {(app.teacherRemark || app.deanRemark) && (
                                        <div className="mt-4 p-3 border rounded bg-light">
                                            <h6 className="mb-2">
                                                <i className="fa-solid fa-pen-to-square me-2"></i>
                                                Remarks
                                            </h6>

                                            {app.teacherRemark && (
                                                <p className="mb-1">
                                                    <b>Teacher:</b> {app.teacherRemark}
                                                </p>
                                            )}

                                            {app.deanRemark && (
                                                <p className="mb-0">
                                                    <b>Dean:</b> {app.deanRemark}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Application;
