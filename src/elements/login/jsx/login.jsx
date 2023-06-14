import {NavLink} from "react-router-dom";
import {SocialIcon} from "react-social-icons";
import "../css/login.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {createRef, useEffect, useRef, useState} from "react";
import signup from "./signup";

function Login() {
    let val =
        <div className={"modal fade"} tabIndex={-1} id={"loginModal"}>
            <div className={"modal-dialog modal-dialog-centered"}>
                <div className={"modal-content"}>
                    <div className={"modal-header d-flex justify-content-center position-relative"}>
                        <div className={"modal-title"}>
                            <img src={"https://mytaba.com/assets/images/image01.svg?v=c07231be"}
                            height={"50rem"}/>
                        </div>
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
        const butt = document.getElementsByClassName("show-pass");

        function toggleVisible() {
            setpassvisible(!passvisible);
        }

        butt[0].addEventListener("click", toggleVisible);
        // butt[1].addEventListener("click", toggleVisible);
        return () => {
            butt[0].removeEventListener("click", toggleVisible);
            // butt[1].addEventListener("click", toggleVisible);
        };
    }, [passvisible]);

    const [passVal, setPassVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const handleUpdateLoginPass = event => {
        setPassVal(event.target.value);
    }
    const handleUpdateLoginEmail = event => {
        setEmailVal(event.target.value);
    }

    // dummy login tester
    const handleSubmitLogin = (e) => {
        const email = "deepanshu@mytaba.com";
        const password = "uwu";
        if (!(email === emailVal && password === passVal)) {
            e.preventDefault();
            alert("Unsuccessful Login");
        } else {
            alert("login success");
        }
    };


    // signup
    // const [passVal, setPassVal] = useState('');
    const [confPassVal, setConfPassVal] = useState('');
    // const [emailVal, setEmailVal] = useState('');
    const handleUpdatePass = event => {
        setPassVal(event.target.value);
    }
    const handleUpdateEmail = event => {
        setEmailVal(event.target.value);
    }
    const handleUpdateConfPass = e => {
        setConfPassVal(e.target.value);
    }

    // dummy signup tester
    const handleSubmit = (e) => {
        if (!(confPassVal === passVal)) {
            e.preventDefault();
            alert("Passwords do not match");
        } else {
            alert("Signup successful");
        }
    }

    const handleFgtPassSubmit = () => {

    }

    const signupForm = createRef();
    const loginForm = createRef();
    const forgotPass = createRef();

    const clear_fields = () => {
        setEmailVal('');
        setPassVal('');
        setConfPassVal('');
        setpassvisible(false);
    }

    const switch_signup = () => {
        clear_fields();
        loginForm.current.style.zIndex = -1;
        signupForm.current.style.zIndex = 1;
        forgotPass.current.style.zIndex = -1;
    }
    const switch_login = () => {
        clear_fields();
        loginForm.current.style.zIndex = 1;
        signupForm.current.style.zIndex = -1;
        forgotPass.current.style.zIndex = -1;
    }

    const switch_fgtpass = () => {
        clear_fields();
        loginForm.current.style.zIndex = -1;
        forgotPass.current.style.zIndex = 1;
        signupForm.current.style.zIndex = -1;
    }

    let val =
        <div className={"loginbody"}>
            <div ref={loginForm} className={"container"}>
                <form className={"container"} onSubmit={handleSubmitLogin} method={"post"}>
                    <div className={"form-fields"}>
                        <input type={"email"} placeholder={"Email"} className={"form-control"} name={"emailLogin"}
                               value={emailVal} onChange={handleUpdateLoginEmail}/>
                        <div className={"position-relative"}>
                            <input type={passvisible ? "text" : "password"} placeholder={"Password"}
                                   className={"form-control"} name={"passwordLogin"}
                                   value={passVal} onChange={handleUpdateLoginPass}/>
                            <button type={"button"} className={"show-pass"}>
                                <FontAwesomeIcon icon={passvisible ? faEye : faEyeSlash}/>
                            </button>
                        </div>
                        <NavLink to={"#"} className={"container form-text"} onClick={switch_fgtpass}>
                            Forgot password
                        </NavLink>
                    </div>
                    <div className={"container d-flex justify-content-center"}>
                        <button type={"submit"} className={"btn btn-primary"}>Log In</button>
                    </div>
                </form>
                <div className={"alt-login"}>
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
                <div className={"container signup form-text text-center"}>
                    Don't have an account?
                    <button className={"container form-text"}
                            onClick={switch_signup}>
                        <b>Sign Up</b></button>
                </div>
            </div>
            <div ref={signupForm} className={"container"}>
                <form className={"container"} onSubmit={handleSubmit}>
                    <div className={"form-fields"}>
                        <input type={"email"} placeholder={"Email"} className={"form-control"} name={"email"}
                               value={emailVal} onChange={handleUpdateEmail}/>
                        <div className={"position-relative"}>
                            <input type={passvisible ? "text" : "password"} placeholder={"Password"}
                                   className={"form-control"} name={"password"}
                                   value={passVal} onChange={handleUpdatePass}/>
                            <button type={"button"} className={"show-pass"}>
                                <FontAwesomeIcon icon={passvisible ? faEye : faEyeSlash}/>
                            </button>
                        </div>
                        <div className={"position-relative"}>
                            <input type={"password"} placeholder={"Retype Password"}
                                   className={"form-control"} name={"conf_password"}
                                   value={confPassVal} onChange={handleUpdateConfPass}/>
                        </div>
                    </div>
                    <div className={"container d-flex justify-content-center"}>
                        <button type={"submit"} className={"btn btn-primary"}>Sign Up</button>
                    </div>
                </form>
                <div className={"alt-signup"}>
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
                <div className={"container login form-text text-center"}>
                    Alr have an account?
                    <button className={"container form-text"}
                            onClick={switch_login}><b>Log In</b>
                    </button>
                </div>
            </div>
            <div ref={forgotPass} className={"container"}>
                <form className={"container"} onSubmit={handleFgtPassSubmit}>
                    <div className={"form-fields"}>
                        <input type={"email"} placeholder={"Email"} className={"form-control"} name={"email"}
                               value={emailVal} onChange={handleUpdateEmail}/>
                        {/*<div className={"position-relative"}>*/}
                        {/*    <input type={passvisible ? "text" : "password"} placeholder={"Password"}*/}
                        {/*           className={"form-control"} name={"password"}*/}
                        {/*           value={passVal} onChange={handleUpdatePass}/>*/}
                        {/*    <button type={"button"} className={"show-pass"}>*/}
                        {/*        <FontAwesomeIcon icon={passvisible ? faEye : faEyeSlash}/>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {/*<div className={"position-relative"}>*/}
                        {/*    <input type={"password"} placeholder={"Retype Password"}*/}
                        {/*           className={"form-control"} name={"conf_password"}*/}
                        {/*           value={confPassVal} onChange={handleUpdateConfPass}/>*/}
                        {/*</div>*/}
                    </div>
                    <div className={"container d-flex justify-content-center"}>
                        <button type={"submit"} className={"btn btn-primary"}>Continue</button>
                    </div>
                </form>
                {/*<div className={"alt-signup"}>*/}
                {/*    <div className={"container text-center"}>*/}
                {/*        Or*/}
                {/*    </div>*/}
                {/*    <div className={"container text-center"}>*/}
                {/*        <NavLink to={"#"} type={"button"} className={"btn btn-secondary"}>*/}
                {/*            /!*<SocialIcon className={"google"}/>*!/*/}
                {/*            G*/}
                {/*            Continue with google*/}
                {/*        </NavLink>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"container login form-text text-center"}>
                    Alr have an account?
                    <button className={"container form-text"}
                            onClick={switch_login}><b>Log In</b>
                    </button>
                </div>
            </div>
        </div>
    ;

    return val;
}

export default Login;