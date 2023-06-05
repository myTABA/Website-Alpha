import ModalContent from "./modal";

function Map() {
    let val =
        <div className={"d-none d-md-flex row rec-map"}>
            <div className={"col"}>
                <div className={"map-overlay"}></div>
                <ModalContent/>
                <div className={"map"}>
                    <img src={"https://www.burningcompass.com/world/maps/world-map-hd.jpg"}/>
                </div>
            </div>
        </div>;
    return val;
}

export default Map;