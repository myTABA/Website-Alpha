import Hero from "./jsx/hero";
import DestinationPOIInspiration from "./jsx/destination";
import TravelGuide from "./jsx/travelguide";
import CTA from "./jsx/cta";

// home page structure for components is defined here. this is rendered in App.js,
//     where react router takes care of dynamic rendering and setting URLs
export default function Home() {
    let text = [];
    text.push("We specialise in creating personalized recommendations tailored to your interests, making it easy to find travel experiences that truly matter to you.");
    text.push(<br/>);
    text.push("myTABA makes it easy to spend less time searching and more time discovering your next great adventure.");
    text.push(<br/>);
    text.push("Find out why myTABA is the best way to plan your next trip, and get ready to make unforgettable memories.");
    let title=[];
    title.push("Skip the endless hours planning your next trip.");
    title.push(<br/>);
    title.push("We've already done it for you");
    return (
        <>
            <Hero/>
            <DestinationPOIInspiration/>
            <CTA
                title={title}
                text={text}
                button={"Discover your next adventure"}/>
            <TravelGuide/>
            <CTA/>
        </>
    );
}