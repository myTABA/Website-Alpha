import "../css/recommendations.css";

function RecItem({img, name, num, match, rating_star, rating_count, description, itinerary_link}) {

    //placeholders
    img = img ? img : "https://images.unsplash.com/photo-1452796651103-7c07fca7a2c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvb2tseW4lMjBicmlkZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
    name = name ? name : "Default Landmark";
    match = match ? match : "95";
    //just a complicated placeholder
    rating_star = rating_star ? rating_star : Math.floor(Math.random() * 5);
    rating_count = rating_count ? rating_count : Math.floor(Math.random() * 100000);
    description = description ? description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque turpis risus, fringilla a sagittis interdum, efficitur vitae odio. Aliquam erat volutpat. Aliquam aliquam semper urna, ac elementum tellus fringilla eu. Vestibulum facilisis consectetur quam. Morbi ac blandit ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";
    itinerary_link = itinerary_link ? itinerary_link : "#";

    let stars = [];
    for (let i = 1; i <= rating_star; i++) {
        stars.push(<Star
            key={i}/>);
    }

    let val =
        <div className={"row rec-item"}>
            <div className={"col-12 col-md-6"}>
                <div className={"rec-img"}>
                    <img src={img}/>
                </div>
            </div>
            <div className={"col-12 col-md-6"}>
                <div className={"rec-text"}>
                    <h4>{num}. {name}</h4>
                </div>
                <div className={"rec-match"}>
                    <span className={"badge bg-success"}>{match}% Match</span>
                </div>
                <div className={"rec-rating"}>
                    {stars} {rating_count} ratings
                </div>
                <div className={"rec-description"}>
                    {description}
                </div>
                <div className={"rec-add"}>
                    <a href={itinerary_link} className={"btn btn-primary"}>
                        Add to itinerary
                    </a>
                </div>
            </div>
        </div>;
    return val;
}

export default function RecommendationPane({items}) {
    //items is an array of objects for populating the RecItems
    let val = [];
    for (const [i, elem] of items.entries()) {    //similar to py's enumerate()
        val.push(<RecItem
            img={elem.img}
            name={elem.name}
            num={i + 1}   //no need to specify number, this will automatically deal w it
            match={elem.match}
            rating_star={elem.rating_star}
            rating_count={elem.rating_count}
            description={elem.description}
            itinerary_link={elem.itinerary_link}
            key={i + 1}/>
        );
    }
    return (
        <div className={"container-fluid"}>
            {val}
        </div>
    );
};

function Star() {
    return (
        <i className={"rec-star"}>&#11088;</i>
    );
}