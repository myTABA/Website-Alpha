import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import React, {useEffect} from "react";
function Logo() {
    return (
        <>
            <a className="navbar-brand" href="#"><img src={"https://mytaba.com/assets/images/image01.svg?v=c07231be"} height={"50rem"}/></a>
            <button className="navbar-toggler" type={"button"} data-toggle={"collapse"}
                    data-target={"#collapseButton"} aria-expanded={"false"}>
                <i className="navbar-toggler-icon"></i>
            </button>
        </>
    );
}

function NavButtons() {
    return (
        <div className="collapse navbar-collapse" id="collapseButton">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <a className="btn nav-link btn" href="#">About Us</a>
                </li>
                <li className="nav-item">
                    <a className="btn nav-link btn" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                    <a className="btn nav-link btn" href="#">Explore Destinations</a>
                </li>
            </ul>
        </div>
    );
}

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Logo/>
            <NavButtons/>
        </nav>
    );
}



