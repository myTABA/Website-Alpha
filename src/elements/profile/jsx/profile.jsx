import {useUser} from "@clerk/clerk-react";
import {useState} from "react";
import "../css/profile.css";
import Account from "./Account";

const Profile = () => {
    const {user} = useUser();

    const [state, setState] = useState({
        props: {
            user: user,
            title: "Account",
            title_info: "Manage your account information",
            type: "account"
        }
    });
    const changeState = (e) => {
        console.log(e.target.textContent);
        selectionHighlight(e.target.parentElement);
        if (e.target.textContent === "Account") {
            setState({
                props: {
                    user: user,
                    title: "Account",
                    title_info: "Manage your account information",
                    type: "account",
                }
            });
        } else if (e.target.textContent === "Security") {
            setState({
                props: {
                    user: user,
                    title: "Security",
                    title_info: "Review Security options here",
                    type: "security",
                }
            });
        } else if (e.target.textContent === "Saved Searches") {
            setState({
                props: {
                    user: user,
                    title: "Saved Searches",
                    title_info: "Get inspired, once more.",
                    type: "savedsearch",
                }
            });
        } else if (e.target.textContent === "Liked Destinations") {
            setState({
                props: {
                    user: user,
                    title: "Liked Destinations",
                    title_info: "Previously Liked Destinations",
                    type: "liked",
                }
            });
        }
    };

    const selectionHighlight = (elem) => {
        let elems = document.querySelectorAll(".profile h3.sh.active");
        for (const [i, elemsKey] of elems.entries()) {
            elemsKey.classList.remove("active");
        }
        elem.classList.add("active");
    };


    const {isLoaded, isSignedIn} = useUser();
    if (!isLoaded || !isSignedIn) {
        return null;
    }
    console.log(user);

    let val =
        <>
            <div className={"container-fluid"}>
                <div className={"row position-relative"}>
                    <div className={"bg-img"}></div>
                    <div className={"container"}>
                        <div className={"col-12 welcome-text"}>
                            <h1 className={"text-justify"}>
                                Welcome back {user.firstName ? user.firstName
                                : (user.username ? user.username
                                    : user.primaryEmailAddress["emailAddress"])}!
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container my-5"}>
                <div className={"row"}>
                    <div className={"col col-md-4 menu m-4 p-4"}>
                        <div className={""}>
                            <ul>
                                <li><h3>Profile</h3></li>
                                <li>
                                    <h3 className={"sh active"}>
                                        <button onClick={changeState}>Account</button>
                                    </h3>
                                </li>
                                <li>
                                    <h3 className={"sh"}>
                                        <button onClick={changeState}>Security</button>
                                    </h3>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><h3>Destinations</h3></li>
                                <li>
                                    <h3 className={"sh"}>
                                        <button onClick={changeState}>Saved Searches</button>
                                    </h3>
                                </li>
                                <li>
                                    <h3 className={"sh"}>
                                        <button onClick={changeState}>Liked Destinations</button>
                                    </h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col content m-4 p-4"}>
                        <MainBar props={state.props}/>
                    </div>
                </div>
            </div>
        </>

    return (
        <div className={"profile"}>
            {val}
        </div>
    );
};

function MainBar(props) {
    let val =
        <>
            <div className={"head"}>
                <div>
                    <h2>{props.props.title}</h2>
                </div>
                <div>
                    <h2 className={"sh"}>{props.props.title_info}</h2>
                </div>
            </div>
            <MainContent type={props.props.type} user={props.props.user}/>
        </>
    return val;
}

function MainContent({user, type}) {
    let val;

    if (type === "account") {
        val = <Account user={user}/>

    } else if (type === 'savedsearch') {
        val =
            <>
                <div>
                    images
                </div>
            </>
    }
    return val;
}

export default Profile;