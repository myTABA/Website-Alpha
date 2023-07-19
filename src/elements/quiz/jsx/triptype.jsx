import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../css/triptype.css";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {toast} from "react-toastify";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import {Adventure, Cultural, FoodDrink, Outdoors, Relaxation, Sport} from "../../../svgs/cSVG";

const TripType = ({changeState}) => {
    let select_elem = new Set();
    let val = <div className={"d-flex justify-content-center"}>
        <button id={"menu2submit"} className={"d-none btn btn-outline-primary"} onClick={e => {
            axios.post('http://localhost:4000/quiz/type-action', {
                "type": document.getElementById("menu2").innerText.trim().split(", ")
            }).then().catch(e => console.error(e));
            changeState("menupoi1");

            // mobile stuff
            const x = document.getElementById("mb-bc-2");
            const header = document.getElementById("mb-bc-header");
            header.innerText = "Step 3, Part 1/5";
            x.querySelector("span").innerText = document.getElementById("menu2").innerText.trim();
            x.classList.remove("d-none");
        }}>
            Submit
        </button>
    </div>;
    return <><Gen select_elem={select_elem}/>{val}</>
};
function Gen({select_elem}) {
    let val = [];
    const elem = document.getElementById("menu2");
    console.log(select_elem.size);
    for (const [i, e] of data.entries()) {
        let ele =
            <div className={"col-4 col-lg-4 my-3 position-relative"} key={i + 1} onClick={e => {
                console.log(select_elem);
                if (!e.currentTarget.querySelector("div.card.selected")) {
                    // click elem not selected
                    if (select_elem.size < 3) {
                        // add to select_elem
                        e.currentTarget.querySelector("div.card").classList.add("selected");
                        e.currentTarget.querySelector("div.card.selected > span").classList.remove("d-none");
                        select_elem.add(e.currentTarget.querySelector("div.card.selected"));
                    } else {
                        toast.warn("Already selected 3");
                    }
                } else {
                    // click elem selected
                    select_elem.delete(e.currentTarget.querySelector("div.card.selected"));
                    e.currentTarget.querySelector("div.card.selected >span").classList.add("d-none");
                    e.currentTarget.querySelector("div.card.selected").classList.remove("selected");
                    // remove from select_elem
                }
                if (select_elem.size > 0) {
                    // update breadcrumb
                    const m = Array.from(select_elem).map(e => e.innerText).join(', ');
                    elem.innerHTML = ReactDOMServer.renderToString(
                            <FontAwesomeIcon icon={faCheckCircle} color={"var(--extra2)"}/>) +
                        ' ' + m;
                    elem.style.color = "var(--extra2)";
                    elem.parentElement.style.borderColor = "var(--extra2)";

                    //also update submit button to be visible
                    document.getElementById("menu2submit").classList.remove("d-none");

                } else {
                    elem.innerHTML = "In Progress";
                    elem.style.color = "var(--black)";
                    elem.parentElement.style.borderColor = "var(--black)";

                    // disable submit button
                    document.getElementById("menu2submit").classList.add("d-none");
                }

            }}>
                <div className={"card"}>
                    <span className={"d-none"}>
                <FontAwesomeIcon icon={faCheckCircle} size={"lg"}/>
                </span>
                    <div className={"card-body"}>
                        <div className={"text-center card-img-top"}>
                            {e.icon}
                        </div>
                        <div className={"b1 card-title text-center"}>
                            {e.name}
                        </div>
                    </div>
                </div>
            </div>;
        val.push(ele);
    }
    return <>
        <div className={"container my-4"}>
            <div className={"row"}>
                {val}
            </div>
        </div>
    </>;
}

const data = [
    {
        name: "Food & Drink",
        icon: <FoodDrink/>
    },
    {
        name: "Cultural",
        icon: <Cultural/>
    },
    {
        name: "Adventurous",
        icon: <Adventure/>
    },
    {
        name: "Outdoorsy",
        icon: <Outdoors/>
    },
    {
        name: "Sporty",
        icon: <Sport/>
    },
    {
        name: "Relaxation",
        icon: <Relaxation/>
    }
];

export default TripType;