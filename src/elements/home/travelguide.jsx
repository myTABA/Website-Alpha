import "./travelguide.css";
export default function TravelGuide() {
    let val =
        <div className={"container"}>
            <div className={"row my-2"}>
                <div className={"col"}>
                    <h3>Travel Guides</h3>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard />
                </div>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard />
                </div>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard />
                </div>
                <div className={"col-6 col-md-4 col-lg-3"}>
                    <TravelCard />
                </div>
            </div>
        </div>;

    return(
        <div className={"travelGuide my-5"}>
            {val}
        </div>
    );

}

function TravelCard({location,img}){
    //todo create default img url
    if(!img){
        img = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";
    }
    if(!location){
        location = "Location";
    }

    return(
        <div className={"card"}>
            <div className={"card-body"}>
                <img src={img} className={"card-img-top travel-img"}></img>
                <div className={"travel-text"}>
                    {location}
                </div>
            </div>
        </div>
    );
}