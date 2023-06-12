import {NavLink} from "react-router-dom";
import {SocialIcon} from "react-social-icons";
import "../css/login.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

function Login() {
    let val =
        <div className={"modal fade"} tabIndex={-1} id={"loginModal"}>
            <div className={"modal-dialog modal-dialog-centered"}>
                <div className={"modal-content"}>
                    <div className={"modal-header d-flex justify-content-center position-relative"}>
                        <h3 className={"modal-title"}>
                            myTABA logo
                        </h3>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"}></button>
                    </div>
                    <div className={"modal-body"}>
                        <p className={"text-center"}>
                            Welcome to <b>myTABA</b>
                        </p>
                        <p className={"text-center"}>
                            Travel planning, personalized for you
                        </p>
                        <LoginBody/>
                    </div>
                </div>
            </div>
        </div>
    ;
    return <div className={"loginModal"}>
        {val}
    </div>;
}

function LoginBody() {

    let [passvisible, setpassvisible] = useState(false);
    useEffect(() => {
        const butt = document.getElementById("show-pass");

        function toggleVisible() {
            setpassvisible(!passvisible);
        }

        butt.addEventListener("click", toggleVisible);
        return () => {
            butt.removeEventListener("click", toggleVisible);
        };
    }, [passvisible]);

    const [passVal, setPassVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const handleUpdatePass = event => {
        setPassVal(event.target.value);
    }
    const handleUpdateEmail = event => {
        setEmailVal(event.target.value);
    }

    // dummy login tester
    const handleSubmit = (e) => {
        const email = "deepanshu@mytaba.com";
        const password = "uwu";
        if (!(email === emailVal && password === passVal)) {
            e.preventDefault();
            alert("Unsuccessful Login");
        } else {
            alert("login success");
        }
    };

    let val =
        <>
            <div className={"container"}>
                <form className={"container"} onSubmit={handleSubmit}>
                    <div className={"form-fields"}>
                        <input type={"email"} placeholder={"Email"} className={"form-control"} name={"email"}
                               value={emailVal} onChange={handleUpdateEmail}/>
                        <div className={"position-relative"}>
                            <input type={passvisible ? "text" : "password"} placeholder={"Password"}
                                   className={"form-control"} name={"password"}
                                   value={passVal} onChange={handleUpdatePass}/>
                            <button type={"button"} id={"show-pass"}>
                                <FontAwesomeIcon icon={passvisible ? faEye : faEyeSlash}/>
                            </button>
                        </div>
                        <NavLink to={"#"} className={"container form-text"}>
                            Forgot password
                        </NavLink>
                    </div>
                    <div className={"container d-flex justify-content-center"}>
                        <button type={"submit"} className={"btn btn-primary"}>Log In</button>
                    </div>
                </form>
                <div className={"alt-login container"}>
                    <div className={"container text-center"}>
                        Or
                    </div>
                    <div className={"container text-center"}>
                        <NavLink to={"#"} type={"button"} className={"btn btn-secondary"}>
                            {/*<SocialIcon className={"google"}/>*/}
                            G
                            Continue with google
                        </NavLink>
                    </div>
                </div>
                <div className={"container signup form-text"}>
                    Don't have an account?
                    <button className={"container form-text"}><b>Sign
                        Up</b></button>
                </div>
            </div>
            {/*<div className={"container"}>*/}
            {/*    <form className={"container"} onSubmit={handleSubmit}>*/}
            {/*        <div className={"form-fields"}>*/}
            {/*            <input type={"email"} placeholder={"Email"} className={"form-control"} name={"email"}*/}
            {/*                   value={emailVal} onChange={handleUpdateEmail}/>*/}
            {/*            <div className={"position-relative"}>*/}
            {/*                <input type={passvisible ? "text" : "password"} placeholder={"Password"}*/}
            {/*                       className={"form-control"} name={"password"}*/}
            {/*                       value={passVal} onChange={handleUpdatePass}/>*/}
            {/*                <button type={"button"} id={"show-pass"}>*/}
            {/*                    <FontAwesomeIcon icon={passvisible ? faEye : faEyeSlash}/>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <div className={"position-relative"}>*/}
            {/*                <input type={"password"} placeholder={"Retype Password"}*/}
            {/*                       className={"form-control"} name={"conf_password"}*/}
            {/*                       value={confPassVal} onChange={handleUpdateConfPass}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={"container d-flex justify-content-center"}>*/}
            {/*            <button type={"submit"} className={"btn btn-primary"}>Sign Up</button>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*    <div className={"alt-signup container"}>*/}
            {/*        <div className={"container text-center"}>*/}
            {/*            Or*/}
            {/*        </div>*/}
            {/*        <div className={"container text-center"}>*/}
            {/*            <NavLink to={"#"} type={"button"} className={"btn btn-secondary"}>*/}
            {/*                /!*<SocialIcon className={"google"}/>*!/*/}
            {/*                G*/}
            {/*                Continue with google*/}
            {/*            </NavLink>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className={"container login form-text"}>*/}
            {/*        Alr have an account?*/}
            {/*        <button className={"container form-text"}><b>Log In</b>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    ;
    return val;
}

export default Login;