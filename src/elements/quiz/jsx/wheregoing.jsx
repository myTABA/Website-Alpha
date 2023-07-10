import "../css/wheregoing.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from "react-dom/server";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";

const WhereGoing = () => {
    let val;
    return <BigGen/>
};

function BigGen() {
    let val = [];
    for (const [i, e] of data.entries()) {
        let elem;
        elem = <>
            <div className={"container my-4"} key={i + 1}>
                <div className={"row"}>
                    <h3>{e.country}</h3>
                </div>
                <div className={"row"}>
                    <SmallGen data={e.cities}/>
                </div>
            </div>
        </>;
        val.push(elem);
    }
    return val;
}

function SmallGen({data}) {
    let val = [];
    for (const [i, e] of data.entries()) {
        let elem;
        elem = <>
            <div className={"col"} key={i + 1} onClick={e => {
                let parent = e.currentTarget;
                let m = parent.querySelector("div.check-selected-marker");
                m.classList.remove("d-none");
                m.classList.add("check-selected");
                m.querySelector("svg").classList.add("flicker-animation");
                setTimeout(() => {
                    m.querySelector("svg").classList.remove("flicker-animation");
                }, 1000);

                let breadcrumb = document.querySelector(".quiz div.b3.active > button");
                breadcrumb.parentElement.style.borderColor = "var(--extra2)";
                breadcrumb.style.color = "var(--extra2)";
                const tick = ReactDOMServer.renderToString(<FontAwesomeIcon icon={faCheckCircle}
                                                                            color={"var(--extra2"}/>);
                breadcrumb.innerHTML = tick + " " +
                    parent.querySelector("div.card-title >h4").innerHTML + ", " +
                    m.closest("div.container").querySelector("div.row > h3").innerHTML;

                //todo also shift to next button, create helper function in diff file for all to access
                // closest will help :)

                //todo add any other data here to be marshalled to bff
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
        </>;
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
                name: "Mont-Saint-Michael",
                img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            },
        ],
    }
];

export default WhereGoing;