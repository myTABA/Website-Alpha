import {UserProfile, useUser} from "@clerk/clerk-react";
import {NavLink} from "react-router-dom";

const Profile = () => {
    const {isLoaded, isSignedIn, user} = useUser();
    if (!isLoaded || !isSignedIn) {
        return null;
    }
    console.log(user);
    console.log(user.getSessions());

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
                                    <button>Account</button>
                                </li>
                                <li>
                                    <button>Security</button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>Destinations</li>
                                <li>
                                    <button>Saved Searches</button>
                                </li>
                                <li>
                                    <button>Linked Destinations</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col-9"}>
                        <div className={"head"}>
                            <div>
                                Tab Name
                            </div>
                            <div>
                                Manage your information
                            </div>
                        </div>
                        <div>
                            Profile blabla
                        </div>
                        <div>
                            Username blabla
                        </div>
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

export default Profile;