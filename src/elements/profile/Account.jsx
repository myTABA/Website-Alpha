import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {toast, ToastContainer} from "react-toastify";
import {Tooltip} from "react-tooltip";

export default function Account({user}) {
    function EmailCreator(elem) {
        // const opacity = .5;
        // if the status is undefined, it is verified(atleast for the example user object i am using)
        // coerce to bool then flip
        // true - verified
        // const status = !!elem.elem.verification.status;
        // let colour;
        // let colour;
        // if (status) {
        //     colour = getComputedStyle(document.documentElement).getPropertyValue('--green').replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        // } else {
        //     colour = getComputedStyle(document.documentElement).getPropertyValue('--red').replace('rgb', 'rgba').replace(')', `, ${opacity})`);
        // }

        const primary = [user.primaryEmailAddress.emailAddress];
        const deletable = !primary.includes(elem.elem.emailAddress);
        const verified = elem.elem.verification.status === 'verified';
        const root = document.documentElement;
        const opacity = .85;
        const green = getComputedStyle(root).getPropertyValue('--green') + Math.round(opacity * 255).toString(16);
        const red = getComputedStyle(root).getPropertyValue('--red') + Math.round(opacity * 255).toString(16);

        return (<>
            {elem.elem.emailAddress ?
                <h3 className={"sh"}>
                    {elem.elem.emailAddress}
                    <span className={"badge"} style={verified ? {
                        backgroundColor: green,
                        cursor: "default"
                    } : {
                        backgroundColor: red,
                        cursor: "pointer"
                    }} data-tooltip-id={"tooltip"}
                          data-tooltip-content={verified ? "You're verified!" : "Click to get verified"}
                          data-tooltip-place={"top-start"}
                          onClick={(e) => {
                              elem.elem.prepareVerification({
                                  strategy: "email_link",
                                  redirectUrl: window.location.href
                              });
                              toast("Check your email for a link to verify this email");
                          }}>
                        {verified ? "Verified" : "Unverified"}</span>
                    {deletable ?
                        <span className={"badge bg-danger"} style={{cursor: "pointer"}} onClick={(e) => {
                            // console.log(elem.elem);
                            elem.elem.destroy();
                            toast("Email removed from profile");
                        }}>Delete Email</span> : ""}
                    {verified && deletable?
                        <span className={"badge bg-info"} style={{cursor: "pointer"}} onClick={(e) => {
                            // console.log(elem.elem);
                            user.update({
                                primaryEmailAddressId: elem.elem.id
                            });
                            toast.success("Primary email updated!");
                        }}>Set Primary</span> : ""}
                    <Tooltip id={"tooltip"}/>
                </h3>
                : ""}
        </>);

    }


    let emails = [];
    for (const [i, em] of user.emailAddresses.entries()) {
        emails.push(<EmailCreator elem={em} key={i + 1}/>);
    }
    const updateDetes = (e) => {
        e.preventDefault();
        let fname = document.getElementById("fname").value ? document.getElementById("fname").value : document.getElementById("fname").placeholder;
        let lname = document.getElementById("lname").value ? document.getElementById("lname").value : document.getElementById("lname").placeholder;
        let usrname = document.getElementById("usrname").value ? document.getElementById("usrname").value : document.getElementById("usrname").placeholder;

        user.update({
            firstName: fname,
            lastName: lname,
            username: usrname,
        });
        toast.success("Profile Updated Successfully!");
    };
    let val =
        <>
            <div className={"mt-5"}>
                <h3>Profile</h3>
            </div>
            <div>
                <h3 className={"sh"}>
                    {user.username ? user.username : "No username"}
                </h3>
            </div>
            <div className={"position-relative name-usrname-pfp"} onClick={(e) => {
                const elem = document.querySelector(".name-usrname-pfp-edit");
                const classList = elem.classList;
                if (classList.contains("visually-hidden")) {
                    elem.classList.remove("visually-hidden");
                } else {
                    elem.classList.add("visually-hidden");
                }
            }}>
                <div className={"position-relative d-inline"} style={{width: "fit-content"}}>
                    <img src={user.imageUrl} className={"pfp"}/>
                </div>
                <h3 className={"sh"} style={{display: "inline"}}>
                        <span>
                            {user.firstName ? user.firstName : "No First Name"}</span>&nbsp;
                    <span>
                            {user.lastName ? user.lastName : "No Last Name"}</span>
                </h3>
                <FontAwesomeIcon icon={faArrowRight} size={"xl"} className={"position-absolute"}/>
            </div>
            <div className={"name-usrname-pfp-edit visually-hidden"}>
                <input type={"file"} hidden style={{display: "none"}} id={"pfp"} onChange={(e) => {
                    e.preventDefault();
                    if (e.target.files.length > 0) {
                        user.setProfileImage({file: e.target.files[0]})
                            .then(r => {
                                toast.success("Updated profile picture");
                            })
                            .catch((err) => {
                                toast.error("Error in updating profile picture");
                            });
                    }
                }}/>
                <div className={"edit-pfp"}>
                    <div className={"mb-3 d-inline-block position-relative"} onClick={
                        (e) => {
                            document.getElementById("pfp").click();
                            // console.log(document.getElementById("pfp").files);
                        }}>
                        <img src={user.imageUrl} className={"pfp"}/>
                        <div className={"edit-pfp-mask"}></div>
                        <FontAwesomeIcon icon={faEdit} className={"position-absolute"}/>
                    </div>
                    <button className={"btn btn-outline-danger"} onClick={(e) => {
                        user.setProfileImage({file: null})
                            .then(r => {
                                toast.success("Profile Picture removed");
                            })
                            .catch((err) => {
                                toast.error("Error in removing profile picture");
                            });
                    }} style={{marginLeft: "1rem"}}>Remove Profile picture
                    </button>

                    <div className={"mb-3"}>
                        <label className={"form-label"}>First Name</label>
                        <input className={"form-control"} placeholder={user.firstName} id={"fname"}/>
                    </div>
                    <div className={"mb-3"}>
                        <label className={"form-label"}>Last Name</label>
                        <input className={"form-control"} placeholder={user.lastName} id={"lname"}/>
                    </div>
                    <div className={"mb-3"}>
                        <label className={"form-label"}>Username</label>
                        <input className={"form-control"} placeholder={user.username} id={"usrname"}/>
                    </div>
                    <div className={"mb-3"}>
                        <button type={"button"} className={"btn btn-success"} onClick={updateDetes}>Update Profile
                            Details
                        </button>
                    </div>
                </div>
            </div>
            <div className={"mt-5"}>
                <h3>Primary Email Address</h3>
                <h3 className={"sh"}>
                    {user.primaryEmailAddress.emailAddress}
                </h3>
            </div>
            <div className={"mt-5"}>
                <h3>All Emails</h3>
                <div className={"sh"}>{emails}</div>
                <div className={"new-email"}>
                    <button className={"btn"} onClick={(e) => {
                        const elem = document.getElementById("new-email-form");
                        const classList = elem.classList;
                        if (classList.contains("visually-hidden")) {
                            elem.classList.remove("visually-hidden");
                        } else {
                            elem.classList.add("visually-hidden");
                            e.currentTarget.textContent = '+ Add new Email';
                        }
                    }}>
                        + Add new Email
                    </button>
                    <div id={"new-email-form"} className={"container visually-hidden"}>
                        <input className={"form-control"} type={"email"} placeholder={"New Email"}
                               id={"new-email"}/>
                        <button type={"button"} className={"btn btn-outline-primary"} onClick={(e) => {
                            const em = document.getElementById("new-email").value;
                            if (em) {
                                user.createEmailAddress({email: em})
                                    .then(() => {
                                        toast.success("Email Added successfully!");
                                        toast("Refresh the profile to view new emails");
                                        document.getElementById("new-email").value = "";
                                        document.querySelector(".new-email > button").click();
                                        // let usr;
                                        // for (const [i, e] of user.emailAddresses.entries()) {
                                        //     console.log(e);
                                        //     if (e.emailAddress === em) {
                                        //         usr = e;
                                        //         break;
                                        //     }
                                        // }
                                        // console.log(usr);
                                        // temails.push(<EmailCreator elem={usr} key={emails.length}/>);
                                        // setEmails(temails);
                                    })
                                    .catch((e) => {
                                        console.warn(e);
                                        toast.error("Invalid email address");
                                    });
                            }
                        }}>Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className={"my-5 pwds"}>
                <h3>Change Password</h3>
                <h3 className={"sh"} style={{display: "inline-block", margin: "0 2rem 0 0"}}><input
                    type={"password"}
                    placeholder={"Old Password"}
                    id={"oldpass"}/></h3>
                <h3 className={"sh"} style={{display: "inline-block"}}><input type={"password"}
                                                                              placeholder={"New Password"}
                                                                              id={"newpass"}/></h3>
                <button className={"btn btn-outline-primary"} type={"button"} style={{display: "block"}}
                        onClick={(e) => {
                            e.preventDefault();
                            user.updatePassword({
                                currentPassword: document.getElementById("oldpass").value,
                                newPassword: document.getElementById("newpass").value
                                // unsure how clerk handles password verification for the promise to work
                            }).then(r => {
                                toast.success("Password changed successfully");
                                document.getElementById("oldpass").value = "";
                                document.getElementById("newpass").value = "";
                            }).catch((error) => {
                                // there is 2 cases where the password update does not take place
                                // 1. current password is incorrect
                                // 2. new password doesnt meet the security features
                                // i am unsure how to diffrentiate between those two
                                toast.error("Current password incorrect or new password does not meet password criteria");
                                document.getElementById("oldpass").value = "";
                            });
                        }}>Update Password
                </button>
            </div>
        </>;
    return val;
}