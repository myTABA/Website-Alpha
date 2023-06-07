import Hero from "./jsx/hero";
import DestinationPOIInspiration from "./jsx/destination";
import TravelGuide from "./jsx/travelguide";
import CTA from "./jsx/cta";

// home page structure for components is defined here. this is rendered in App.js,
//     where react router takes care of dynamic rendering and setting URLs
export default function Home() {
    return (
        <>
            <Hero/>
            <DestinationPOIInspiration/>
            <TravelGuide/>
            <CTA/>
        </>
    );
}