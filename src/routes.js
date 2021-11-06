import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page2 from "./pages/Page-2";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function Routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/portfolio" component={Portfolio}/>
                <Route path="/page-2" component={Page2}/>
                <Route component={NotFound}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Routes;