import Map from "./jsx/map";
import RecommendationPane from "./jsx/recommendationList";
import ModalContent from "./jsx/modal";

export default function Recommendation() {

    let items = [
        {},
        {},
        {},
        {}
    ];

    let val =
        <>
            <div className={"container-fluid recommendation"}>
                <div className={"row"}>
                    <div className={"col-12 col-lg-4"}>
                        <RecommendationPane
                            items={items}/>
                    </div>
                    <div className={"d-none d-lg-block col-lg-8"}>
                        <Map/>
                    </div>
                </div>
            </div>

        </>;
    return val;
}