export default function Footer(){
    let val =
        <div className={"container-fluid"}>
            <div className={"row text-center"}>
                <div className={"col-12 col-md"}>
                    <ul className={"navbar-nav"}>
                        <li className={"nav-item nav-head"}>
                            made with &heart; in PIT
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
                            <a href={"#"}>Blog</a>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <a href={"#"}>Destination Guides</a>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <a href={"#"}>About Us</a>
                        </li>
                        <li className={"nav-item nav-link"}>
                            <a href={"#"}>Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div className={"col-12 col-md"}>
                    <ul className={"navbar-nav"}>
                        <li className={"nav-item nav-head"}>
                            Say "hi"
                        </li>
                        <li className={"nav-item nav-link"}>
                            logos
                        </li>
                    </ul>
                </div>
            </div>
        </div>;

    return(
        <div className={"footer"}>
            {val}
        </div>
    );
}