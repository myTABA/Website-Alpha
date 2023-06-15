// https://www.matthewhoelter.com/2022/04/02/how-to-scroll-to-top-on-route-change-with-react-router-dom-v6.html

import {useLocation} from "react-router-dom";
import {useEffect} from "react";

function ScrollToTop({history}) {
    const {pathname} = useLocation();
    useEffect(() => {
        // let r = Math.floor(Math.random() * 2);
        // console.log(r);
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            // using randomiser to swap between scrolling styles
            // behavior: r === 0 ? "instant" : "smooth"
            behavior: "smooth",
        });
    }, [pathname]);
    return null;
}

export default ScrollToTop;