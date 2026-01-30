import React from 'react'

const Home = () => {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                            style={{ width: "250px" }}
                        />
                        <button className="btn btn-outline-light rounded-pill" type="submit">
                            Search
                        </button>
                    </form>

                    {/* Right: User */}
                    <ul className="navbar-nav ms-lg-auto align-items-lg-center">
                        <li className="nav-item me-2">
                            <span className="nav-link text-white fw-semibold fs-5">
                                Hi 👋, Yachika
                            </span>
                        </li>

                        <li className="nav-item">
                            <a className="btn btn-outline-light btn-sm" href="/login">
                                Login
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default Home