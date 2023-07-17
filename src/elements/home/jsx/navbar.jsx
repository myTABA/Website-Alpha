import "jquery/dist/jquery.min.js";
import React, {Component, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/clerk-react";

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
            <LoginBtn dkey={"sms"}/>
        </>
    );
}

function NavButtons({navbarVisible}) {

    function getWindowWidth() {
        return window.innerWidth;
    }

    const [screenWidth, setScreenWidth] = useState(getWindowWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(getWindowWidth());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const changetoBTS = screenWidth >= 992;

    return (
        <>
            <div className={`collapse navbar-collapse ${navbarVisible ? "collapse" : ""}`} id="collapseButton">
                <div className="navbar-nav mx-auto">
                    <NavLink to={"/"}
                             className={`nav-link`}>Plan a Trip</NavLink>
                    <NavLink to={"/travel-guides"}
                             className={`nav-link`}>Travel
                        Guides</NavLink>
                    <NavLink to={"https://google.com"}
                             className={"nav-link"}>Blog</NavLink>
                    <NavLink to={"https://google.com"}
                             className={"nav-link"}>About Us</NavLink>
                    {/*<NavLink to={"/"}*/}
                    {/*         className={`${changetoBTS ? "btn btn-outline-primary" : ""} nav-link`}>Home</NavLink>*/}
                    {/*<NavLink to={"https://google.com"}*/}
                    {/*         className={`${changetoBTS ? "btn btn-outline-primary" : ""} nav-link`}>About Us</NavLink>*/}
                    {/*<NavLink to={"https://google.com"}*/}
                    {/*         className={`${changetoBTS ? "btn btn-outline-primary" : ""} nav-link`}>Pricing</NavLink>*/}
                    {/*<NavLink to={"/travel-guides"}*/}
                    {/*         className={`${changetoBTS ? "btn btn-outline-primary" : ""} nav-link`}>Travel*/}
                    {/*    Guides</NavLink>*/}

                    <LoginBtn dkey={"lgs"}/>
                </div>
            </div>
        </>
    );
}

function LoginBtn({dkey}) {

    const urlHandler = (href) => {
        href = href.split("/");
        return href[href.length - 1];
    }

    const logoutHandler = (lochref) => {
        const protectedURL = ['recommendations', 'profile'];
        let curr_url = lochref.split('/');
        curr_url = curr_url[curr_url.length - 1];
        if (protectedURL.includes(curr_url)) {
            // console.log(true);
            return "/";
        } else {
            console.log(lochref);
            console.warn(window.location.href);
            return lochref;
        }
    }

    return (
        <span data-key={dkey} className={"nav-link signup-login"}>
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
                    redirectUrl={urlHandler(window.location.href)}
                />
                <SignUpButton
                    mode={"modal"}
                    redirectUrl={urlHandler(window.location.href)}
                />
            </SignedOut>
            <SignedIn>
                <UserButton
                    showName={false}
                    userProfileMode={"navigation"}
                    afterSignOutUrl={logoutHandler(window.location.href)}
                    afterMultiSessionSingleSignOutUrl={logoutHandler(window.location.href)}
                    userProfileUrl={
                        typeof window !== "undefined"
                            ? `${window.location.origin}/profile`
                            : undefined
                    }
                />
            </SignedIn>
        </span>
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

    // navbar scroll script js
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
                <div className={"container position-relative"}>
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

