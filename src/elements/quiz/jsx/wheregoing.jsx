import "../css/wheregoing.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from "react-dom/server";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import axios from "axios";

const WhereGoing = ({changeState}) => {
    let val =
        <div className={"row"}>
            <div className={"d-flex justify-content-center"}>
                <button id={"menu1submit"} className={"d-none btn btn-outline-primary"} onClick={e => {
                    axios.post('http://localhost:4000/quiz/location-action', {
                        "location": document.getElementById("menu1").innerText.trim()
                    }).then().catch(e => console.error(e));
                    changeState("menu2");
                }}>
                    Submit
                </button>
            </div>
            <div className={"d-flex align-items-center flex-column my-3"}>
                <div className={"b2"}>
                    Destination not listed?
                </div>
                <div className={"my-2"}>
                    <button className={"btn btn-outline-secondary"} onClick={e=>{
                        changeState("wheregoingrequest");
                    }}>
                        <h4>
                            Request a new destination
                        </h4>
                    </button>
                </div>
            </div>
        </div>
    return <><BigGen/>{val}</>
};

function BigGen() {
    let val = [];
    for (const [i, e] of data.entries()) {
        let elem;
        elem = <React.Fragment key={i + 1}>
            <div className={"container my-4"}>
                <div className={"row"}>
                    <h3>{e.country}</h3>
                </div>
                <div className={"row"}>
                    <SmallGen data={e.cities}/>
                </div>
            </div>
        </React.Fragment>;
        val.push(elem);
    }
    return val;
}

function SmallGen({data}) {
    let val = [];
    for (const [i, e] of data.entries()) {
        let elem;
        elem = <React.Fragment key={i + 1}>
            <div className={"col"} onClick={e => {
                let parent = e.currentTarget;
                let m = parent.querySelector("div.check-selected-marker");
                let t = document.getElementById("wheregoing").querySelectorAll("div.check-selected-marker");
                t.forEach(e => {
                    e.classList.add("d-none");
                    e.classList.remove("check-selected");
                });
                m.classList.remove("d-none");
                m.classList.add("check-selected");
                m.querySelector("svg").classList.add("flicker-animation");
                setTimeout(() => {
                    m.querySelector("svg").classList.remove("flicker-animation");
                }, 500);

                let breadcrumb = document.querySelector(".quiz div.b3.active > button");
                // document.querySelector("#wheregoing > div.d-flex.justify-content-center > button").removeAttribute("disabled");
                breadcrumb.parentElement.style.borderColor = "var(--extra2)";
                breadcrumb.style.color = "var(--extra2)";
                const tick = ReactDOMServer.renderToString(<FontAwesomeIcon icon={faCheckCircle}
                                                                            color={"var(--extra2"}/>);
                breadcrumb.innerHTML = tick + " " +
                    parent.querySelector("div.card-title >h4").innerHTML + ", " +
                    m.closest("div.container").querySelector("div.row > h3").innerHTML;

                //enable the submit button as atleast one is selected
                document.getElementById("menu1submit").classList.remove("d-none");

            }}>
                <div className={"card"}>
                    <div className={"card-body"}>
                        <div className={"card-img-top position-relative"}>
                            <div
                                className={"position-absolute check-selected-marker d-none d-flex justify-content-center align-items-center"}>
                                <FontAwesomeIcon icon={faCheck} size={"4x"} color={"var(--white)"}/>
                            </div>
                            <img src={e.img}/>
                        </div>
                        <div className={"card-title"}>
                            <h4>{e.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>;
        val.push(elem);
    }
    return val;
}

const data = [
    {
        country: "Spain",
        cities: [
            {
                name: "Barcelona",
                img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            },
            {
                name: "Madrid",
                img: "https://images.unsplash.com/photo-1579282240050-352db0a14c21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            },
            {
                name: "Segovia",
                img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            },
        ],
    },
    {
        country: "France",
        cities: [
            {
                name: "Paris",
                img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            },
            {
                name: "Nice",
                img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            },
            {
                name: "Mont-Saint-Michel",
                img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            },
        ],
    }
];

export default WhereGoing;