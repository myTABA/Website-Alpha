import "./App.css";
import Navbar from "./elements/home/jsx/navbar";
import Footer from "./elements/home/jsx/footer";
import {Route, Routes} from "react-router-dom";
import Home from "./elements/home/home";
import Recommendation from "./elements/recommendation/rec";
import Login from "./elements/login/jsx/login";

export default function App() {

    return (
        <>
            <Navbar/>
            <Routes>

                <Route path={'/'} element={<Home/>}/>
                <Route path={'/recommendations'} element={<Recommendation/>}/>

            </Routes>
            <Footer/>
            <Login/>
        </>
    );
}