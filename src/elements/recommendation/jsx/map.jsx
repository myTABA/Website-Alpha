import ModalContent from "./modal";
import {useEffect, useRef} from "react";
import {Status, Wrapper} from "@googlemaps/react-wrapper";


// this is simple, just plots the map
function Map() {
    const overlayRef = useRef(null);
    const mapAreaParent = useRef(null);

    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return "wait";
            case Status.FAILURE:
                return "fail";
            case Status.SUCCESS:
                return <MapComponent prop={calcCenter()}/>;
            default:
                return null;
        }
    }

    let val =
        <div ref={mapAreaParent} className={"d-none d-md-flex row rec-map"}>
            <div className={"col map-popup"}>
                <div ref={overlayRef} className={"map-overlay"}></div>
                {/*<ModalContent overlayRef={overlayRef}/>*/}
                <Wrapper apiKey={process.env.REACT_APP_GOOGLE_KEY} render={render}/>

            </div>
        </div>;

    // useEffect(()=>{
    //     if(mapAreaParent.current){
    //         let w = mapAreaParent.current.clientWidth;
    //         let h = mapAreaParent.current.clientHeight;
    //         overlayRef.current.style.clientHeight =h;
    //         overlayRef.current.style.clientHeight =w;
    //     }
    // });

    return val;

    // todo on click, display the blacked out div and display the modal which would be a normal div
}

const tlocs = [
    {
        lat: 51.497541,
        lng: -.069502
    },
    {
        lat: 51.491637,
        lng: -.078772
    },
    {
        lat: 51.503793,
        lng: -.091303
    },
    {
        lat: 51.504162,
        lng: -.067374
    },
    {
        lat: 51.506700,
        lng: -.071655
    },
];

const calcCenter = () => {
    let [lat, lng] = [0, 0];

    let bounds = new window.google.maps.LatLngBounds();
    for (const [i, e] of tlocs.entries()) {
        lat += e.lat;
        lng += e.lng;
        bounds.extend(new window.google.maps.LatLng(e.lat,e.lng));
    }

    return {
        centre: {lat: lat / tlocs.length, lng: lng / tlocs.length},
        bound: bounds,
        zoom: 7
    };
}

function MapComponent({prop}) {
    const ref = useRef();
    const infoWindow = new window.google.maps.InfoWindow();
    const [center,zoom] = [prop.centre,prop.zoom];
    const mapStyle =[
        {
            featureType: "poi",
            stylers:[{visibility:"off"}]
        },
        {
            featureType: "transit",
            stylers:[{visibility:"off"}]
        },
        // {
        //     featureType: "roads",
        //     elementType:"labels",
        //     stylers: [{visibility: "off"}]
        // }

    ];
    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            center,
            zoom,
            styles: mapStyle,
        });

        for(const[i,e] of tlocs.entries()){
            const marker = new window.google.maps.Marker({
                position: e,
                map,
                title: "hey",
                label: (i+1).toString(),
            });
            marker.addListener("click", () => {
                infoWindow.close();
                infoWindow.setContent(marker.getTitle());
                infoWindow.open(marker.getMap(), marker);
            });
            marker.setAnimation(window.google.maps.Animation.DROP);
        }
        map.fitBounds(prop.bound);
    }, [center, infoWindow, zoom]);
    return (
        <div id={"map"} className={"map"} ref={ref}>
            {/*<img src={"https://www.burningcompass.com/world/maps/world-map-hd.jpg"}/>*/}
        </div>
    );
}

export default Map;