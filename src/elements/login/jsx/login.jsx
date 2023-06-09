import {NavLink} from "react-router-dom";
import {SocialIcon} from "react-social-icons";
import "../css/login.css";

function Login() {
    let val =
        <div className={"modal fade"} tabIndex={-1} id={"loginModal"}>
            <div className={"modal-dialog modal-dialog-centered"}>
                <div className={"modal-content"}>
                    <div className={"modal-header text-center d-flex justify-content-center"}>
                        <h3 className={"modal-title"}>
                            myTABA logo
                        </h3>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"}></button>
                    </div>
                    <div className={"modal-body"}>
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
    let val =
        <div className={"container"}>
            <form className={"container"}>
                <div className={"form-fields"}>
                    <input type={"email"} placeholder={"Email"} className={"form-control"} name={"email"}/>
                    <input type={"password"} placeholder={"Password"} className={"form-control"} name={"email"}/>
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
        </div>
    ;
    return val;
}

export default Login;