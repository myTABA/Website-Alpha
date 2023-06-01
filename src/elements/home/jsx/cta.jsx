import "../css/cta.css";
import $ from "jquery";
import {useEffect} from "react";

export default function CTA({title, text, button}) {
    let val;
    if (!button) {
        button = "Call to Action";
    }
    if (!title) {
        title = "Feature";
    }
    val = <div className={"card cta-card"}>
        <div className={"card-header"}>
            <p className={"card-title"}>{title}</p>
        </div>
        <div className={"card-body text-center"}>
            <p className={"card-text"}>
                {text}
            </p>

            <a href={"#"} className={"cta-button card-link btn btn-primary"}>
                {button}
            </a>

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
    },[]); //no dependencies to ensure one exec

    return (
        <div className={"cta my-5"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col d-flex justify-content-center"}>
                        {val}
                    </div>
                </div>
            </div>
        </div>
    );
}