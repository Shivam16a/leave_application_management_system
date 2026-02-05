import React from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="container my-3">
                <button
                    className="btn btn-outline-primary mb-3"
                    onClick={() => navigate("/")}
                >
                    <i className="fa fa-home me-2"></i>Back to Home
                </button>
            </div>
            <div className="container my-5">
                {/* Main About Card */}
                <div
                    className="card shadow-lg p-4 border-0"
                    style={{
                        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
                        animation: "fadeIn 1s ease-in-out"
                    }}
                >
                    <h2 className="text-center mb-4 text-primary">
                        <i className="fa-solid fa-circle-info me-2"></i>
                        About Leave Application System
                    </h2>

                    <p className="text-muted text-justify">
                        <i className="fa-solid fa-laptop-file me-2 text-secondary"></i>
                        The Leave Application System is a digital platform designed to
                        simplify and streamline the process of submitting and managing
                        student leave applications. Students can apply for leave online,
                        track application status, and receive remarks from teachers and
                        the dean.
                    </p>

                    <p className="text-muted text-justify">
                        <i className="fa-solid fa-bullseye me-2 text-danger"></i>
                        The primary objective of this system is to reduce paperwork,
                        improve transparency, and ensure faster approval of leave
                        requests. Faculty members can efficiently review and respond to
                        applications within a structured workflow.
                    </p>


                    <h5 className="mt-4 text-dark">
                        <i className="fa-solid fa-star me-2 text-warning"></i>
                        Key Features
                    </h5>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-transparent">
                            <i className="fa-solid fa-file-signature me-2 text-primary"></i>
                            Online leave application submission
                        </li>
                        <li className="list-group-item bg-transparent">
                            <i className="fa-solid fa-user-check me-2 text-success"></i>
                            Teacher and Dean approval workflow
                        </li>
                        <li className="list-group-item bg-transparent">
                            <i className="fa-solid fa-chart-line me-2 text-info"></i>
                            Real-time application status tracking
                        </li>
                        <li className="list-group-item bg-transparent">
                            <i className="fa-solid fa-comments me-2 text-secondary"></i>
                            Remarks from Teacher and Dean
                        </li>
                        <li className="list-group-item bg-transparent">
                            <i className="fa-solid fa-clock me-2 text-danger"></i>
                            Time-restricted application submission
                        </li>
                    </ul>

                    <p className="mt-4 fw-semibold text-center text-dark">
                        <i className="fa-solid fa-handshake me-2 text-success"></i>
                        This digital system streamlines leave applications, reduces paperwork, and enables faculty to process requests efficiently and transparently.
                        Students can submit and track their applications online, while teachers and the Dean can review, approve, and document requests without manual handling of forms.
                    </p>

                </div>

                {/* Developer Team Section */}
                <div className="mt-5">
                    <h3 className="text-center mb-4 text-primary">
                        <i className="fa-solid fa-people-group me-2"></i>
                        Developer Team
                    </h3>

                    <div className="row justify-content-center g-4">

                        {/* Developer Card 1: Shivam Kumar */}
                        <div className="col-md-4 col-sm-8">
                            <div className="card h-100 shadow-sm text-center border-0 developer-card" style={{ background: "linear-gradient(135deg, #e3f2fd, #fce4ec)" }}>
                                <div className="card-body">

                                    <i className="fa-solid fa-user-graduate fa-3x text-primary mb-3 floating-icon"></i>

                                    <h5 className="card-title">Shivam Kumar</h5>

                                    <p className="text-muted mb-1">
                                        Full Stack Developer
                                    </p>

                                    <p className="small mb-2">
                                        React.js • Node.js • Express • MongoDB
                                    </p>


                                    <div className="mt-3 social-links">
                                        <a
                                            href="#"
                                            rel="noreferrer"
                                            className="me-3 instagram fs-5"
                                        >
                                            <i className="fab fa-instagram"></i>
                                        </a>

                                        <a
                                            href="https://github.com/Shivam16a"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="me-3 github fs-5"
                                        >
                                            <i className="fab fa-github"></i>
                                        </a>

                                        <a
                                            href="mailto:shivam123hjp@gmail.com"
                                            className="email fs-5"
                                        >
                                            <i className="fas fa-envelope"></i>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Developer Card 2: Karan Kumar */}
                        <div className="col-md-4 col-sm-8">
                            <div className="card h-100 shadow-sm text-center border-0 developer-card" style={{ background: "linear-gradient(135deg, #e3f2fd, #fce4ec)" }}>
                                <div className="card-body">

                                    <i className="fa-solid fa-user-graduate fa-3x text-primary mb-3 floating-icon"></i>

                                    <h5 className="card-title">Karan Kumar</h5>

                                    <p className="text-muted mb-1">
                                        Full Stack Developer
                                    </p>

                                    <p className="small mb-2">
                                        React.js • Node.js • Express • MongoDB
                                    </p>


                                    <div className="mt-3 social-links">
                                        <a
                                            href="#"
                                            rel="noreferrer"
                                            className="me-3 instagram fs-5"
                                        >
                                            <i className="fab fa-instagram"></i>
                                        </a>

                                        <a
                                            href="https://github.com/Shivam16a"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="me-3 github fs-5"
                                        >
                                            <i className="fab fa-github"></i>
                                        </a>

                                        <a
                                            href="mailto:shivam123hjp@gmail.com"
                                            className="email fs-5"
                                        >
                                            <i className="fas fa-envelope"></i>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                    <p className="text-center mt-4 fw-bold">
                        <i className="fa-solid fa-graduation-cap me-2"></i>
                        Developed for Academic Use
                    </p>

                    {/* Inline CSS for animation */}
                    <style>
                        {`
                        /* Card hover animation */
                        .developer-card {
                            transition: transform 0.4s ease, box-shadow 0.4s ease;
                            position: relative;
                        }
                        .developer-card:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
                        }

                        /* Floating main icon */
                        .floating-icon {
                            animation: float 3s ease-in-out infinite;
                        }
                        @keyframes float {
                            0% { transform: translateY(0); }
                            50% { transform: translateY(-8px); }
                            100% { transform: translateY(0); }
                        }

                        /* Social icons animation */
                        .social-links a {
                            display: inline-block;
                            transition: transform 0.3s ease, color 0.3s ease;
                        }
                        .social-links a:hover {
                            transform: translateY(-5px) rotate(10deg);
                            filter: drop-shadow(0 0 5px #f0f);
                        }

                        /* Icon specific colors */
                        .instagram:hover { color: #E4405F !important; }
                        .github:hover { color: #333 !important; }
                        .email:hover { color: #007bff !important; }

                    @keyframes fadeIn {
                        from {
                        opacity: 0;
                        transform: translateY(20px);
                        }
                        to {
                        opacity: 1;
                        transform: translateY(0);
                        }
                    }
                    `}
                    </style>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default About;
