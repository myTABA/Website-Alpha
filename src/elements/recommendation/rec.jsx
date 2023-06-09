import Map from "./jsx/map";
import RecommendationPane from "./jsx/recommendationList";

// this design was the most painful, so it has been very very compartmentalised
export default function Recommendation() {

    let items = [
        {},
        {},
        {},
        {}
    ];
    let modalobjects=[{},{},{},{}];

    let val =
        <>
            {/*divide the screen into two halves for the map and the list*/}
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