import Map from "./jsx/map";
import RecommendationPane from "./jsx/recommendationList";
import {useState} from "react";

// this design was the most painful, so it has been very very compartmentalised
/**
 * Main component of the recommendation canvas.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Recommendation() {

    const [items, setItems] = useState([]);
    // todo replace w axios at some point ig, joyce's endpoint for ratepoi#5
    import("./response.json").then(m => {
        setItems(m.default.pois);
    }).catch(err => {
        console.log(err)
    });
    const [itemsM, setItemsM] = useState([]);
    import("./response_must.json").then(m => {
        setItemsM(m.default.pois);
    }).catch(err => {
        console.log(err)
    });
    // content for modal. different call to it. one by one. change props of the modal and good to go
    let modalobjects = [{}, {}, {}, {}];

    let val =
        <>
            {/*divide the screen into two halves for the map and the list*/}
            <div className={"container-fluid recommendation"}>
                <div className={"row"}>
                    <div className={"col-12 col-lg-4"}>
                        <RecommendationPane
                            items_rec={items} items_must={itemsM}/>
                    </div>
                    <div className={"d-none d-lg-block col-lg-8"}>
                        <Map/>
                    </div>
                </div>
            </div>

        </>;
    return val;
}