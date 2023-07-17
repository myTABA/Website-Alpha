import {useUser} from "@clerk/clerk-react";
import {useState} from "react";
import "./css/quiz.css";
import WhereGoing from "./jsx/wheregoing";
import Triptype from "./jsx/triptype";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import RatePoi from "./jsx/ratepoi";


const Quiz = () => {

    const [state, setState] = useState({
        props: {
            title: "Where are you travelling?",
            title_info: "For multiple destinations make a new request after this one!",
            type: "wheregoing"
        }
    });
    const changeState = (e) => {
        let id = e;
        console.log(id);
        const likerts = document.getElementsByName("likert");
        if(likerts){
            likerts.forEach(e=>{
                e.checked=false;
            });
        }
        selectionHighlight(document.getElementById(id).parentElement);
        // if (id.includes("menupoi")) {
        //     id = id.substring(0, id.length - 1);
        // }
        if (id === "menu1") {
            setState({
                props: {
                    title: "Where are you travelling?",
                    title_info: "For multiple destinations make a new request after this one!",
                    type: "wheregoing",
                    id: id,
                }
            });
        } else if (id === "menu2") {
            document.getElementById(id).innerHTML = "In progress";
            setState({
                props: {
                    title: "What type of trip are you looking for?",
                    title_info: "Select up to 3 options below",
                    type: "triptype",
                    id: id,
                }
            });
        }
        else if (id.includes("menupoi")) {
            setState({
                props: {
                    title: "How interested are you in visiting:",
                    title_info: "Help us learn more about your trip preferences by rating the following",
                    type: "ratepoi",
                    id: id,
                }
            });
        }else if(id==="fin"){
            //finished state, after clicking submit on menupoi5
        }
        else if (id === "menupoi2") {
            setState({
                props: {
                    title: "Liked Destinations",
                    title_info: "Previously Liked Destinations",
                    type: "liked",
                    id: id,
                }
            });
        } else if (id === "menupoi3") {
            setState({
                props: {
                    title: "Hei :)",
                    title_info: "Very hi",
                    type: "heh",
                    id: id,
                }
            });
        } else if (id === "menupoi4") {
            setState({
                props: {
                    title: "Hei :)",
                    title_info: "Very hi",
                    type: "heh",
                    id: id,
                }
            });
        } else if (id === "menupoi5") {
            setState({
                props: {
                    title: "Hei :)",
                    title_info: "Very hi",
                    type: "heh",
                    id: id,
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
                    <div className={"col col-md-4 menu my-4 mx-4 p-4"}>
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
                                        <button id={"menu1"}>In Progress</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><h4>What type of trip are you looking for?</h4></li>
                                <li>
                                    <div className={"b3"}>
                                        <button id={"menu2"}>Not Completed</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li><h4>Let us know how you feel about these recommendations</h4></li>
                                <li>
                                    <div className={"b3"}>
                                        <button id={"menupoi1"}>Point of Interest
                                            1
                                        </button>
                                    </div>
                                    <div className={"b3"}>
                                        <button id={"menupoi2"}>Point of Interest
                                            2
                                        </button>
                                    </div>
                                    <div className={"b3"}>
                                        <button id={"menupoi3"}>Point of Interest
                                            3
                                        </button>
                                    </div>
                                    <div className={"b3"}>
                                        <button id={"menupoi4"}>Point of Interest
                                            4
                                        </button>
                                    </div>
                                    <div className={"b3"}>
                                        <button id={"menupoi5"}>Point of Interest
                                            5
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"col content my-4 mx-4 p-4"}>
                        <MainBar props={state.props} state={state} changeState={changeState}/>
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

function MainBar({props, state, changeState}) {
    const backButton = <div className={"b3"}
                            style={{width: "fit-content", borderRadius: "5rem", padding: ".3rem .7rem"}}>
        <button className={"btn"} onClick={e => {
            if (props.id === "menu2") {
                changeState("menu1");
            } else if (props.id === "menupoi1") {
                changeState("menu2");
            } else if (props.id === "menupoi2") {
                changeState("menupoi1");
            } else if (props.id === "menupoi3") {
                changeState("menupoi2");
            } else if (props.id === "menupoi4") {
                changeState("menupoi3");
            } else if (props.id === "menupoi5") {
                changeState("menupoi4");
            }
        }}>
            <FontAwesomeIcon icon={faArrowLeft}/> Back
        </button>
    </div>;
    let val =
        <div id={props.type}>
            <div className={"head"}>
                {['menu1'].includes(props.id) ?
                    '' : backButton
                }
                <div>
                    <h2>{props.title}</h2>
                </div>
                <div>
                    <h2 className={"sh"}>{props.title_info}</h2>
                </div>
            </div>
            <MainContent type={props.type} state={state} changeState={changeState}/>
        </div>
    return val;
}

function MainContent({type, state, changeState}) {
    let val;

    if (type === "wheregoing") {
        val = <WhereGoing changeState={changeState}/>

    } else if (type === 'triptype') {
        val = <Triptype changeState={changeState}/>
    } else if (type === 'ratepoi') {
        val = <RatePoi state={state} changeState={changeState}/>
    }
    return val;
}

export default Quiz;