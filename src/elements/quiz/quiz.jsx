import {useUser} from "@clerk/clerk-react";
import {useState} from "react";
import "./css/quiz.css";
import WhereGoing from "./jsx/wheregoing";


const Quiz = () => {

    const [state, setState] = useState({
        props: {
            title: "Where are you travelling?",
            title_info: "For multiple destinations make a new request after this one!",
            type: "wheregoing"
        }
    });
    const changeState = (e) => {
        console.log(e.target.textContent);
        selectionHighlight(e.target.parentElement);
        if (e.target.textContent === "Account") {
            setState({
                props: {
                    title: "Account",
                    title_info: "Manage your account information",
                    type: "account",
                }
            });
        } else if (e.target.textContent === "Security") {
            setState({
                props: {
                    title: "Security",
                    title_info: "Review Security options here",
                    type: "security",
                }
            });
        } else if (e.target.textContent === "Saved Searches") {
            setState({
                props: {
                    title: "Saved Searches",
                    title_info: "Get inspired, once more.",
                    type: "savedsearch",
                }
            });
        } else if (e.target.textContent === "Liked Destinations") {
            setState({
                props: {
                    title: "Liked Destinations",
                    title_info: "Previously Liked Destinations",
                    type: "liked",
                }
            });
        }
    };

    const selectionHighlight = (elem) => {
        let elems = document.querySelectorAll(".quiz div.b3.active");
        for (const [i, elemsKey] of elems.entries()) {
            elemsKey.classList.remove("active");
        }
        elem.classList.add("active");
    };

    let val =
        <>
            <div className={"container my-5"}>
                <div className={"row"}>
                    <div className={"col col-md-4 menu m-4 p-4"}>
                        <div className={""}>
                            <ul>
                                <li>
                                    <h3>Get your recommendations in 3 easy steps</h3>
                                </li>
                            </ul>
                            <ul>
                                <li><h4>Where are you going?</h4></li>
                                <li>
                                    <div className={"b3 active"}>
                                        <button onClick={changeState}>In Progress</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><h4>What type of trip are you looking for?</h4></li>
                                <li>
                                    <div className={"b3"}>
                                        <button onClick={changeState}>Not Completed</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><h4>Let us know how you feel about these recommendations</h4></li>
                                <li>
                                    <div className={"b3"}>
                                        <button onClick={changeState}>Point of Interest 1</button>
                                    </div>
                                    <div className={"b3"}>
                                        <button onClick={changeState}>Point of Interest 1</button>
                                    </div>
                                    <div className={"b3"}>
                                        <button onClick={changeState}>Point of Interest 1</button>
                                    </div>
                                    <div className={"b3"}>
                                        <button onClick={changeState}>Point of Interest 1</button>
                                    </div>
                                    <div className={"b3"}>
                                        <button onClick={changeState}>Point of Interest 1</button>
                                    </div>
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
        <div className={"quiz"}>
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

function MainContent({type}) {
    let val;

    if (type === "wheregoing") {
        val = <WhereGoing/>

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

export default Quiz;

// todo for each button there will be an associated state that gets triggered. can containerise them but in essence, each button has a different mainbar state