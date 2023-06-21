import {UserProfile, useUser} from "@clerk/clerk-react";
import {NavLink} from "react-router-dom";
import {useState} from "react";

const Profile = () => {
    const {user} = useUser();

    const [state, setState] = useState({props: {user: user, title: "", title_info: "", type: ""}});
    const changeState = (e) => {
        console.log(e.target.textContent);
        if (e.target.textContent === "Account") {
            setState({
                props: {
                    user: user,
                    title: "Account",
                    title_info: "Manage your account information",
                    type: "account",
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
        }
    }


    const {isLoaded, isSignedIn} = useUser();
    if (!isLoaded || !isSignedIn) {
        return null;
    }
    console.log(user);

    let val =
        <>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"bg-img"}></div>
                    <div className={"container"}>
                        <div className={"col-12 col-md-7 col-lg-6"}>
                            <h1 className={"text-justify"}>
                                Welcome back {user.firstName ? user.firstName
                                : (user.username ? user.username
                                    : user.primaryEmailAddress["emailAddress"])}!
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-3"}>
                        <div>
                            <ul>
                                <li>Profile</li>
                                <li>
                                    <button onClick={changeState}>Account</button>
                                </li>
                                <li>
                                    <button onClick={changeState}>Security</button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>Destinations</li>
                                <li>
                                    <button onClick={changeState}>Saved Searches</button>
                                </li>
                                <li>
                                    <button onClick={changeState}>Linked Destinations</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-9"}>
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
                <div>props.
                    {props.props.title}
                </div>
                <div>
                    {props.props.title_info}
                </div>
            </div>
            <MainContent type={props.props.type} user={props.props.user}/>
        </>
    return val;
}

function MainContent({user, type}) {
    let val;
    if (type === "account") {
        console.log('acc');
        val =
            <>
                <div>
                    Profile
                </div>
                <div>
                    <img src={""}/> FirstName LastName
                </div>
                <div>
                    Username
                </div>
                <div>
                    Email
                </div>
                <div>
                    Password
                </div>
            </>;
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