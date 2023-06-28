import {UserProfile, useUser} from "@clerk/clerk-react";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import "./profile.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        function EmailCreator(elem) {
            return <h3 className={"sh"}>{elem.elem.emailAddress}</h3>
        }

        let emails = [];
        for (const [i, em] of user.emailAddresses.entries()) {
            emails.push(<EmailCreator elem={em} key={i + 1}/>)
        }
        const updateDetes = (e) => {
            e.preventDefault();
            user.update({
                firstName: document.getElementById("fname").textContent,
                lastName: document.getElementById("lname").textContent,
                username: document.getElementById("usrname").textContent,
            });
        };
        val =
            <>
                <div className={"mt-5"}>
                    <h3>Profile</h3>
                </div>
                <div>
                    <input type={"file"} hidden style={{display: "none"}} id={"pfp"} onChange={(e) => {
                        console.log(e.target.files);
                        e.preventDefault();
                        if (e.target.files.length > 0) {
                            user.setProfileImage({file: e.target.files[0]})
                                .then(r => {
                                })
                                .catch((err) => {
                                });
                        }
                    }}/>
                    <div className={"position-relative d-inline"} style={{width: "fit-content"}}>
                        <img src={user.imageUrl} className={"pfp"} onClick={(e) => {
                            document.getElementById("pfp").click();
                            // console.log(document.getElementById("pfp").files);
                        }}/>
                        <i className={"btn-close"} onClick={(e) => {
                            user.setProfileImage({file: null})
                                .then(r => {
                                })
                                .catch((err) => {
                                });
                        }}></i>
                    </div>
                    <h3 className={"sh"} style={{display: "inline"}}>
                        <span contentEditable={true} id={"fname"}>
                            {user.firstName ? user.firstName : "unset"}</span>&nbsp;
                        <span contentEditable={true} id={"lname"}>
                            {user.lastName ? user.lastName : "unset"}</span>
                    </h3>
                </div>
                <div>
                    <h3 className={"sh"} contentEditable={true} id={"usrname"}>
                        {user.username ? user.username : "no username set, change it now"}
                    </h3>
                </div>
                <div>
                    <button type={"button"} className={"btn btn-success"} onClick={updateDetes}>Update Profile Details
                    </button>
                </div>
                <div className={"mt-5"}>
                    <h3>Primary Email Address</h3>
                    <h3 className={"sh"}>
                        {user.primaryEmailAddress.emailAddress}
                    </h3>
                </div>
                <div className={"mt-5"}>
                    <h3>All Emails</h3>
                    <h3 className={"sh"}>{emails}</h3>
                </div>
                <div className={"my-5"}>
                    <h3>Change Password</h3>
                    <h3 className={"sh"} style={{display: "inline-block", margin: "0 2rem 0 0"}}><input
                        type={"password"}
                        placeholder={"Old Password"}
                        id={"oldpass"}/></h3>
                    <h3 className={"sh"} style={{display: "inline-block"}}><input type={"password"}
                                                                                  placeholder={"New Password"}
                                                                                  id={"newpass"}/></h3>
                    <button className={"btn btn-success"} type={"button"} style={{display: "block"}}
                            onClick={(e) => {
                                e.preventDefault();
                                user.updatePassword({
                                    currentPassword: document.getElementById("oldpass").value,
                                    newPassword: document.getElementById("newpass").value
                                    // unsure how clerk handles password verification for the promise to work
                                }).then(r => {
                                    document.getElementById("passInfo").textContent = "Password changed successfully";
                                    document.getElementById("oldpass").value = "";
                                    document.getElementById("newpass").value = "";
                                }).catch((error) => {
                                    // there is 2 cases where the password update does not take place
                                    // 1. current password is incorrect
                                    // 2. new password doesnt meet the security features
                                    // i am unsure how to diffrentiate between those two
                                    document.getElementById("passInfo").textContent = "Current password incorrect or new password does not meet password criteria"
                                    document.getElementById("oldpass").value = "";
                                });
                            }}>Update Password
                    </button>
                    <div className={""} id={"passInfo"}></div>
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