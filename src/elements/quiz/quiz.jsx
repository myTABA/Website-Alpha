import {useEffect, useState} from "react";
import "./css/quiz.css";
import WhereGoing from "./jsx/wheregoing";
import Triptype from "./jsx/triptype";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import RatePoi from "./jsx/ratepoi";
import Fin from "./jsx/fin";
import Wheregoingrequest from "./jsx/wheregoingrequest";


const Quiz = () => {

    const [state, setState] = useState({
        props: {
            title: "Where are you travelling?",
            title_info: "For multiple destinations make a new request after this one!",
            type: "wheregoing",
            id: "menu1"
        }
    });
    const changeState = (e) => {
        let id = e;
        console.log(id);
        const likerts = document.getElementsByName("likert");
        if (likerts) {
            likerts.forEach(e => {
                e.checked = false;
            });
        }
        if (id !== "fin" && id !== "wheregoingrequest")
            selectionHighlight(document.getElementById(id).parentElement);
        // if (id.includes("menupoi")) {
        //     id = id.substring(0, id.length - 1);
        // }

        // id is based off the breadcumb bar. i am using that as reference to filter down as menupois are coupled as one
        /*
        |       |   id                  |   type                |   info                            |
        |   1   |   menu1               |   wheregoing          |   first question                  |
        |   2   |   menu2               |   triptype            |   select category                 |
        |   3   |   menupoi             |   ratepoi             |   rating pois                     |
        |   4   |   fin                 |   fin                 |   finish page                     |
        |   5   |   wheregoingrequest   |   wheregoingrequest   |   request page for destination    |
        |   6   |   menu1 [variant]     |   wheregoing          |   return to menu1 but with        |
        |       |                       |                       |   edited title                    |
         */


        if (id === "menu1") {
            setState({
                props: {
                    title: "Where are you travelling?",
                    title_info: "For multiple destinations make a new request after this one!",
                    type: "wheregoing",
                    id: id,
                }
            });
        } else if (id === "wheregoingrequest") {
            setState({
                props: {
                    title: "Destination Request",
                    title_info: "We are constantly adding destinations!",
                    type: "wheregoingrequest",
                    id: id
                }
            });
        } else if (id === "menu2") {
            if (document.getElementById(id).innerHTML === "Not Completed") {
                document.getElementById(id).innerHTML = "In Progress";
            }
            setState({
                props: {
                    title: "What type of trip are you looking for?",
                    title_info: "Select up to 3 options below",
                    type: "triptype",
                    id: id,
                }
            });
        } else if (id.includes("menupoi")) {
            setState({
                props: {
                    title: "Help us learn more about your trip preferences!",
                    title_info: "How interested are you in visiting:",
                    type: "ratepoi",
                    id: id,
                }
            });
        } else if (id === "fin") {
            //finished state, after clicking submit on menupoi5
            setState({
                props: {
                    title: "Your recommendations are ready!",
                    title_info: '',
                    type: "fin",
                    id: id
                }
            })
        }
    };

    const selectionHighlight = (elem) => {
        let elems = document.querySelectorAll(".quiz div.b3.active");
        for (const [, elemsKey] of elems.entries()) {
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
                        <MainBar props={state.props} state={state} changeState={changeState} setStateONLYFORREQ={setState}/>
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

function MainBar({props, state, changeState, setStateONLYFORREQ}) {
    const backButton = <div className={"b3"}
                            style={{width: "fit-content", borderRadius: "5rem", padding: ".3rem .7rem"}}>
        <button className={"btn"} onClick={() => {
            if (props.id === "menu2" || props.id === "wheregoingrequest") {
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
            } else if (props.id === "fin") {
                changeState("menupoi5");
            }
        }}>
            <FontAwesomeIcon icon={faArrowLeft}/> Back
        </button>
    </div>;
    return <div id={props.type}>
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
        <MainContent type={props.type} state={state} changeState={changeState} setStateONLYFORREQ={setStateONLYFORREQ}/>
    </div>;
}

function MainContent({type, state, changeState, setStateONLYFORREQ}) {
    let val;

    if (type === "wheregoing") {
        val = <WhereGoing changeState={changeState}/>;
        // very rigid code to select the selected element if it exists. DFS
        useEffect(() => {
            if (type === "wheregoing") {
                const innertext = document.getElementById("menu1").innerText;
                console.log(innertext);
                if (innertext !== "In Progress") {
                    const [city, country] = innertext.split(', ');
                    const start = document.getElementById(type);
                    const item = start.querySelectorAll("div.row > h3");
                    let ans;
                    for (const [, e] of item.entries()) {
                        if (e.innerText === country) {
                            ans = e;
                            break;
                        }
                    }
                    let x = ans.parentElement.parentElement.childNodes[1].querySelectorAll("div.card-title > h4");
                    for (const [, e] of x.entries()) {
                        if (e.innerText === city.trim()) {
                            ans = e;
                            break;
                        }
                    }
                    ans.click();
                }
            }
        }, [type]);

    } else if (type === "wheregoingrequest") {
        val = <Wheregoingrequest setState={setStateONLYFORREQ}/>;

    } else if (type === 'triptype') {
        val = <Triptype changeState={changeState}/>;
        // very rigid code to select the selected elements if exists. DFS
        useEffect(() => {
            if (type === "triptype") {
                const arr = document.getElementById("menu2").innerText.split(',');
                const start = document.getElementById(type);
                let x = start.querySelectorAll("div.card-body > div.card-title.text-center.b1");
                console.log(arr);
                console.log(x.entries());
                arr.forEach(e => {
                    for (const [, r] of x.entries()) {
                        if (e.trim() === r.innerText) {
                            r.click();
                            break;
                        }
                    }
                });
            }
        }, [type]);
    } else if (type === 'ratepoi') {
        val = <RatePoi state={state} changeState={changeState}/>;
    } else if (type === "fin") {
        val = <Fin changeState={changeState}/>;
    }
    return val;
}

export default Quiz;