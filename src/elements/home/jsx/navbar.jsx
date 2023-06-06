import "jquery/dist/jquery.min.js";
import React, {Component, useState} from "react";
import {NavLink} from "react-router-dom";

function Logo() {
    return (
        <>
            <NavLink to={"/"} className={"navbar-brand"}><img
                src={"https://mytaba.com/assets/images/image01.svg?v=c07231be"}
                height={"50rem"}/></NavLink>
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

    constructor(props) {
        super(props);
        // set state of component:
        // prev scroll position is set to the y position of scroll(i.e. 0)
        // then we set the navbar visible as true
        this.state = {
            prevScrollPos: window.scrollY,
            navbarVisible: true
        };
    }

    //if the component rendered, then we set an event listener on the scroll
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    // when component gets unrendered, remove the event listener
    // kinda useless since navbar is there persistently
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    // event listener
    handleScroll = () => {
        // set position of current scroll position
        const currentScrollPos = window.scrollY;
        //get prevscroll val
        const {prevScrollPos} = this.state;
        this.setState({
            // if prev scroll was greater than current scroll(top is 0),
            // that means that user scrolled up, which means that the navbar visible needs be set true
            // otherwise false
            navbarVisible: prevScrollPos > currentScrollPos,
            // update the prev scroll pos to current val
            prevScrollPos: currentScrollPos
        });
    };

    render() {
        const {navbarVisible} = this.state;
        // get the navbar bool
        return (
            <nav
                // based off the bool val, set the class. class behaviour defined in css
                className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${navbarVisible ? "navbar-show" : "navbar-hide"}`}>
                <div className={"container"}>
                    <Logo/>
                    <NavButtons/>
                </div>
            </nav>
        );
    }
}

export default Navbar;

