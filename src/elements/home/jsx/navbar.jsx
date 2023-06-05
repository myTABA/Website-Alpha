import "jquery/dist/jquery.min.js";
import React, {Component, useEffect, useState} from "react";

function Logo() {
    return (
        <>
            <a className="navbar-brand" href="#"><img src={"https://mytaba.com/assets/images/image01.svg?v=c07231be"}
                                                      height={"50rem"}/></a>
            <button className="navbar-toggler" type={"button"} data-bs-toggle={"collapse"}
                    data-bs-target={"#collapseButton"}>
                <i className="navbar-toggler-icon"></i>
            </button>
        </>
    );
}

function NavButtons() {

    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Add event listener on component mount to handle collapse state changes
    // useEffect(() => {
    //     const collapseButton = $('#collapseButton');
    //     collapseButton.on('hide.bs.collapse', () => {
    //         setIsCollapsed(false);
    //     });
    //     collapseButton.on('show.bs.collapse', () => {
    //         setIsCollapsed(true);
    //     });
    //
    //     return () => {
    //         collapseButton.off('hide.bs.collapse');
    //         collapseButton.off('show.bs.collapse');
    //     };
    // }, []);

    const collapseClass = isCollapsed ? 'show' : '';

    return (
        <div className={`collapse navbar-collapse ${collapseClass}`} id="collapseButton">
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

// export default function Navbar() {
//
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <Logo/>
//             <NavButtons/>
//         </nav>
//     );
// }

class Navbar extends Component {

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Logo/>
                <NavButtons/>
            </nav>
        );
    }
}

export default Navbar;

