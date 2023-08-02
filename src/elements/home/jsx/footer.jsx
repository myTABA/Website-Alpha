import "../css/footer.css";
import {SocialIcon} from "react-social-icons";
import {NavLink} from "react-router-dom";

/**
 * The footer element
 * @returns {JSX.Element}
 * @constructor
 */
export default function Footer() {

    let icon_css =
        {
            borderRadius: "30px",
            margin: "1.2em .2em ",
            height: "2.2em",
            width: "2.2em"
        }

    let val =
        <div className={"container-fluid py-5"}>
            <div className={"row text-center"}>
                {/*three columns for footer*/}
                <div className={"col-12 col-md"}>
                    <ul className={"navbar-nav"}>
                        <li className={"nav-item nav-head"}>
                            made with &#10084; in PIT
                        </li>
                        <li className={"nav-item"}>
                            &copy; 2023 myTABA
                        </li>
                    </ul>
                </div>
                <div className={"col-12 col-md"}>
                    <ul className={"navbar-nav"}>
                        <li className={"nav-item nav-head"}>
                            myTABA
                        </li>
                        <li className={"nav-item nav-link"}>
                            <NavLink className={"nav-link"} to={"#"}>Blog</NavLink>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <NavLink className={"nav-link"} to={"#"}>Destination Guides</NavLink>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <NavLink className={"nav-link"} to={"#"}>About Us</NavLink>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <NavLink className={"nav-link"} to={"#"}>Contact Us</NavLink>
                        </li>
                    </ul>
                </div>
                <div className={"col-12 col-md"}>
                    <ul className={"navbar-nav"}>
                        <li className={"nav-item nav-head"}>
                            Say "hi"
                        </li>
                        <li className={"nav-item nav-link"}>
                            <SocialIcon
                                url={"https://facebook.com"}
                                target={"_blank"}
                                className={"facebook"}
                                style={icon_css}/>
                            <SocialIcon
                                url={"https://linkedin.com"}
                                target={"_blank"}
                                className={"linkedin"}
                                style={icon_css}/>
                            <SocialIcon
                                url={"https://youtube.com"}
                                target={"_blank"}
                                className={"youtube"}
                                style={icon_css}/>
                            <SocialIcon
                                url={"https://instagram.com"}
                                target={"_blank"}
                                className={"instagram"}
                                style={icon_css}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;

    return (
        <div className={"footer"}>
            {val}
        </div>
    );
}