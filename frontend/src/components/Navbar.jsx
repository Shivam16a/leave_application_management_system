import React from 'react'
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import Application from '../pages/Application';


const Navbar = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));

    const hadellogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    }
    return <>
        <nav className={`navbar navbar-expand-lg navbar-dark ${user.role === "student" ? "bg-primary" : "bg-success"}`}>
            <div className="container-fluid position-relative">

                {/* Left: Brand */}
                <a className="navbar-brand fw-bold fs-3" href="#">Yachika</a>

                {/* Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Small screen search */}
                    <form className="d-flex d-lg-none my-2">
                        <input className="form-control me-2 rounded-pill" type="search" placeholder="Search..." />
                        <button className="btn btn-outline-light rounded-pill" type="submit">Search</button>
                    </form>
                    {/* Center: Search (ONLY centered on large screens) */}
                    <form className="d-none d-lg-flex position-absolute start-50 translate-middle-x">
                        <input
                            className="form-control me-2 rounded-pill"
                            type="search"
                            placeholder="Search..."
                            style={{ width: "350px" }}
                        />
                        <button className="btn btn-outline-light rounded-pill" type="submit">
                            Search
                        </button>
                    </form>

                    {/* Right: User */}
                    <ul className="navbar-nav ms-lg-auto align-items-lg-center">
                        <li className="nav-item me-2">
                            <span className="nav-link text-white fw-semibold fs-5">
                                Hi 👋 {user.role === "student" ? `${user.name}` : `${user.staffName}`}
                            </span>
                        </li>

                        <li className="nav-item">
                            <button className="btn btn-outline-light btn-sm" onClick={hadellogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Application/>
    </>
}

export default Navbar