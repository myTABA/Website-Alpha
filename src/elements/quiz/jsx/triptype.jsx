import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../css/triptype.css";
import {
    faBreadSlice,
    faChurch, faPersonFalling, faPersonPraying, faTree,
    faVolleyballBall
} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {toast} from "react-toastify";
import ReactDOMServer from "react-dom/server";
import axios from "axios";

const TripType = ({changeState}) => {
    let val = <div className={"d-flex justify-content-center"}>
        <button className={"btn btn-outline-primary"} onClick={e => {
            //todo add any other data here to be marshalled to bff
            axios.post('http://localhost:4000/quiz/type-action', {
                "type": document.getElementById("menu2").innerText.trim().split(", ")
            }).then().catch(e => console.error(e));
            changeState("menupoi1");
        }}>
            Submit
        </button>
    </div>;
    return <><Gen/>{val}</>
};

let select_elem = new Set();
function selectItemsAgain(select_elem){
    console.log(select_elem);
    const elem = document.getElementById("menu2");
    if (select_elem.size > 0) {
        const m = Array.from(select_elem).map(e => e.innerText).join(', ');
        elem.innerHTML = ReactDOMServer.renderToString(
                <FontAwesomeIcon icon={faCheckCircle} color={"var(--extra2)"}/>) +
            ' ' + m;
    }
    select_elem.forEach(e=>{
        e.classList.add("selected");
        // does not work because the elements are re-rendered, the reference is lost
    });
}

function Gen() {
    let val = [];
    const elem = document.getElementById("menu2");
    selectItemsAgain(select_elem);
    console.log(select_elem.size);
    for (const [i, e] of data.entries()) {
        let ele =
            <div className={"col-12 col-md-6 col-lg-4 my-3 position-relative"} key={i + 1} onClick={e => {
                console.log(select_elem);
                if (!e.currentTarget.querySelector("div.card.selected")) {
                    if (select_elem.size < 3) {
                        // add to select_elem
                        e.currentTarget.querySelector("div.card").classList.add("selected");
                        e.currentTarget.querySelector("div.card.selected > span").classList.remove("d-none");
                        select_elem.add(e.currentTarget.querySelector("div.card.selected"));
                    } else {
                        toast.warn("Already selected 3");
                    }
                } else {
                    select_elem.delete(e.currentTarget.querySelector("div.card.selected"));
                    e.currentTarget.querySelector("div.card.selected >span").classList.add("d-none");
                    e.currentTarget.querySelector("div.card.selected").classList.remove("selected");
                    // remove from select_elem
                }
                if (select_elem.size > 0) {
                    const m = Array.from(select_elem).map(e => e.innerText).join(', ');
                    elem.innerHTML = ReactDOMServer.renderToString(
                            <FontAwesomeIcon icon={faCheckCircle} color={"var(--extra2)"}/>) +
                        ' ' + m;
                    elem.style.color = "var(--extra2)";
                    elem.parentElement.style.borderColor = "var(--extra2)";
                } else {
                    elem.innerHTML = "In Progress";
                    elem.style.color = "var(--black)";
                    elem.parentElement.style.borderColor = "var(--black)";
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
        icon: <FontAwesomeIcon icon={faBreadSlice} size={"7x"}/>
    },
    {
        name: "Cultural",
        icon: <FontAwesomeIcon icon={faChurch} size={"7x"}/>
    },
    {
        name: "Adventurous",
        icon: <FontAwesomeIcon icon={faPersonFalling} size={"7x"}/>
    },
    {
        name: "Outdoorsy",
        icon: <FontAwesomeIcon icon={faTree} size={"7x"}/>
    },
    {
        name: "Sporty",
        icon: <FontAwesomeIcon icon={faVolleyballBall} size={"7x"}/>
    },
    {
        name: "Relaxation",
        icon: <FontAwesomeIcon icon={faPersonPraying} size={"7x"}/>
    }
];

export default TripType;