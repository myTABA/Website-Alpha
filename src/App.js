import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import "./App.css";
import Hero from "./elements/home/jsx/hero";
import Navbar from "./elements/home/jsx/navbar";
import DestinationPOIInspiration from './elements/home/jsx/destination';
import CTA from "./elements/home/jsx/cta";
import Footer from "./elements/home/jsx/footer";
import TravelGuide from "./elements/home/jsx/travelguide";

export default function App() {
    return (
        <>
            <Navbar/>
            <Hero />
            <DestinationPOIInspiration />
            <TravelGuide/>
            <CTA
            title={"Feature"}
            text={"Now"}
            button={"Call to Action"}/>
            <Footer/>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                    crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
                    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossOrigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
                    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                    crossOrigin="anonymous"></script>
        </>
    );
}