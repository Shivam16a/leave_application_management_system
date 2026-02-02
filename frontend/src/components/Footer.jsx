import React from "react";

const Footer = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const footerBg = (role) => {
        switch (role) {
            case "student":
                return "bg-primary";
            case "teacherapplicationchecker":
                return "bg-warning";
            case "dean":
                return "bg-success";
            default:
                return "bg-secondary";
        }
    };

    const footerText = (role) => {
        switch (role) {
            case "teacherapplicationchecker":
                return "text-dark";
            default:
                return "text-white";
        }
    };

    return (
        <footer className={`${footerBg(user?.role)} ${footerText(user?.role)} mt-5`}>
            <div className="container py-4">
                <div className="row align-items-center">

                    {/* Left */}
                    <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <h5 className="fw-bold mb-1">Yachika</h5>
                        <small>Student Application Management System</small>
                    </div>

                    {/* Center */}
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                        <a href="#" className={`${footerText(user?.role)} me-3 fs-5`}>
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/silent_life_2004/" className={`${footerText(user?.role)} me-3 fs-5`}>
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className={`${footerText(user?.role)} me-3 fs-5`}>
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a 
                        href="https://github.com/Shivam16a" 
                        className={`${footerText(user?.role)} me-3 fs-5`}
                        target="_blank"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                        <a
                            href="mailto:shivam123hjp@gmail.com?subject=Hello%20Yachika&body=I%20want%20to%20contact%20you%20regardin%20the%20application."
                            className={`${footerText(user?.role)} me-3 fs-5`}
                            target="_blank"
                        >
                            <i className="fas fa-envelope"></i>
                        </a>
                        <a
                            href="https://wa.me/918002632535?text=Hello%20Yachika%2C%20I%20want%20to%20contact%20you" className={`${footerText(user?.role)} fs-5`}
                            target="_blank"
                        >
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>

                    {/* Right */}
                    <div className="col-md-4 text-center text-md-end">
                        <small>
                            © {new Date().getFullYear()} All Rights Reserved
                        </small>
                        <br />
                        <small className="fw-semibold">
                            Developed by <span className="text-decoration-underline">Shivam Kumar</span>
                        </small>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
