import React from 'react'
import { useAuth } from '../context/Authcontext';
import { Link } from 'react-router-dom';
import Application from '../pages/Application';
import ShowApplication from '../pages/ShowApplication';


const Navbar = () => {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));

    const navbackgroundcolor = (roles) => {
        switch (roles) {
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

    const navTextcolor = (roles) => {
        switch (roles) {
            case "teacherapplicationchecker":
                return "text-dark";
            default:
                return "text-white";
        }
    };

    const btncolor = (roles) => {
        switch (roles) {
            case "teacherapplicationchecker":
                return "btn-outline-dark";
            default:
                return "btn-outline-light";
        }
    }

    const hadellogout = () => {
        logout();
    }
    return <>
        <nav className={`navbar navbar-expand-lg ${navbackgroundcolor(user.role)}`}>
            <div className="container-fluid position-relative">

                {/* Left: Brand */}
                <Link className={`navbar-brand ${navTextcolor(user.role)} fw-bold fs-3`} to="/">Yachika</Link>

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
                            className="form-control me-1 rounded-pill"
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
                            <span className={`nav-link ${navTextcolor(user.role)} fw-semibold fs-5`}>
                                Hi 👋🏿 {user.role === "student" ? `${user.name}` : `${user.staffName}`}
                            </span>
                        </li>
                        <li className='nav-item me-2'>
                            <Link to="/about" className={`nav-link ${navTextcolor(user.role)} fw-semibold fs-5 hover-scale`}>
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className={`btn ${btncolor(user.role)} btn-sm`} onClick={hadellogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        {user.role === "student" ? (<Application />) : (<ShowApplication />)}
        <style>
            {`  
                .hover-scale {
                    transition: transform 0.3s ease, color 0.3s ease;
                }

                .hover-scale:hover {
                    transform: scale(1.1) translateY(-2px);
                    color: #ffd700; /* hover color */
                }
            `}
        </style>
    </>
}

export default Navbar