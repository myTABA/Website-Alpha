import "../css/cta.css";
import {useEffect} from "react";
import {NavLink} from "react-router-dom";

export default function CTA({title, text, button}) {
    let   val;
    // set default vals for when data is not provided
    // ❗❗ Only for testing ❗❗
    if (!button) {
        button = "Call to Action";
    }
    if (!title) {
        title = "Feature";
    }
    val =
        <div className={"card cta-card"}>
            <div className={"card-header"}>
                <h2 className={"card-title"}>
                    {title}
                </h2>
            </div>
            <div className={"card-body"}>
                <div className={"card-text b1"} style={{marginBottom: "4rem"}}>
                    {text}
                </div>

                <div className={"text-center"}>
                    <NavLink to={"/quiz"} className={"cta-button card-link btn btn-primary"}>
                        <h3>{button}</h3>
                    </NavLink>
                </div>

            </div>
        </div>;

    //using react hook to execute the width extension
    useEffect(() => {
        const widthAdjust = () => {
            let elem = document.querySelector('.cta-card > .card-body.text-center > a.card-link');
            if (elem) {
                elem.style.width = elem.offsetWidth + 18 + "px";
            }
        };
        widthAdjust();
    }, []); //no dependencies to ensure one exec; callback

    return (
        <div className={"cta my-5"}>
            <div className={"container"}>
                <div className={"row"}>

                    <div className={"col d-flex justify-content-center"}>
                        <div className={""}>
                            {val}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}