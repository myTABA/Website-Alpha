import "jquery/dist/jquery.min.js";
import React, {Component, useState} from "react";
import {NavLink} from "react-router-dom";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

function Logo() {
    return (
        <>
            <NavLink to={"/"} className={"navbar-brand"}><img
                src={"https://mytaba.com/assets/images/image01.svg?v=c07231be"}
                height={"50rem"}/></NavLink>
            <button className={`navbar-toggler`} type={"button"}
                    data-bs-toggle={"collapse"}
                    data-bs-target={"#collapseButton"}>
                <i className="navbar-toggler-icon"></i>
            </button>
        </>
    );
}

function NavButtons({navbarVisible}) {

    return (
        <>
            <div className={`collapse navbar-collapse ${navbarVisible ? "collapse" : ""}`} id="collapseButton">
                <div className="navbar-nav me-auto">
                    <NavLink to={"/"} className={"nav-link"}>Home</NavLink>
                    <NavLink to={"https://google.com"} className={"nav-link"}>About Us</NavLink>
                    <NavLink to={"https://google.com"} className={"nav-link"}>Pricing</NavLink>
                    <NavLink to={"/travel-guides"} className={"nav-link"}>Travel Guides</NavLink>

                    <span id={"signup-login"}>
                        {/*<NavLink to={"#"} className={"nav-link"}*/}
                        {/*         data-bs-target={"#Modal"} data-bs-toggle={"modal"}>*/}
                        {/*    Sign Up*/}
                        {/*</NavLink>*/}
                        <SignedOut>
                            {/*<NavLink to={"#"} className={"nav-link"} style={{color: "var(--bs-nav-link-color)"}}*/}
                            {/*         data-bs-target={"#loginModal"} data-bs-toggle={"modal"}>*/}
                            {/*    Login*/}
                            {/*</NavLink>*/}
                            <SignInButton
                                mode={"modal"}
                            />
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                showName={true}
                                userProfileMode={"modal"}
                            />
                        </SignedIn>
                    </span>
                </div>
            </div>

        </>
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

    // navabr scroll script js
    constructor(props) {
        super(props);
        // set state of component:
        // prev scroll position is set to the y position of scroll(i.e. 0)
        // then we set the navbar visible as true
        this.state = {
            prevScrollPos: window.scrollY,
            navbarVisible: true,
            opacity: 1,
            // this is for collapsing the navbar
            scrollUp: false
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
        const navbarHeight = 76;

        //get prevscroll val
        const {prevScrollPos} = this.state;
        this.setState({
            // if prev scroll was greater than current scroll(top is 0),
            // that means that user scrolled up, which means that the navbar visible needs be set true
            // otherwise false
            navbarVisible: prevScrollPos - currentScrollPos > 0 || currentScrollPos < navbarHeight,
            // update the prev scroll pos to current val
            prevScrollPos: currentScrollPos,
            opacity: currentScrollPos === navbarHeight ? 0 : (currentScrollPos <= navbarHeight ? 1 - (currentScrollPos / navbarHeight) : 1),
            scrollUp: prevScrollPos > currentScrollPos,
        });
    };

    render() {
        const {navbarVisible, opacity} = this.state;
        // get the navbar bool
        return (
            <nav
                // based off the bool val, set the class. class behaviour defined in css
                className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${navbarVisible ? "navbar-show" : "navbar-hide"}`}
                style={{opacity: opacity}}>
                <div className={"container"}>
                    <Logo/>
                    <NavButtons
                        // pass a boolean to check if navbar was scrolled and hidden, if so, collapse the navbar
                        // just QoL
                        navbarVisible={this.state.scrollUp}/>
                </div>
            </nav>
        );
    }
}

export default Navbar;

