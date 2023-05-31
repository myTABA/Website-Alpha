import "./cta.css";
import $ from "jquery";

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

            <a href={"#"} className={"card-link btn btn-primary"}>
                {button}
            </a>

        </div>
    </div>

    return (
        <div className={"row"}>
            <div className={"col d-flex justify-content-center"}>
                {val}
            </div>
            {/*try to execute this thing*/}
            <Width/>
        </div>
    );
}

function Width() {
    let elem = $('.cta-card > .card-body.text-center > a.card-link');
    elem.width(elem.width() + 18);
}