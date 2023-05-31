import "./hero.css";
export default function Hero() {
    return (
        <div className="row">
            <div className="col d-flex justify-content-start align-items-center bg-parent">
                <div className={"bg-img"}></div>

                <div className={"col-4 offset-2"}>
                    <p className="text-justify">
                        <b>You won't plan a trip without our recommendations again</b>
                    </p>
                    <p className="text-justify">
                        Discover unique points of interest and personalised activities in just 2 minutes. All for free
                    </p>
                    <p className="d-flex justify-content-start">
                        <GetStarted/>
                    </p>
                </div>
            </div>
        </div>
    );
}

function GetStarted() {
    return (
        <a href="#" className="btn btn-outline-success">Personalise your Travel</a>
    );
}