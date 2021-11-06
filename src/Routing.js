import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page2 from "./pages/Page-2";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route path="/portfolio" element={<Portfolio/>}/>
                <Route path="/page-2" element={<Page2/>}/>
                <Route element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;