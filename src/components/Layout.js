import React from 'react';
import Routes from "../routes";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

function Layout(props) {
    return (
        <div>
            <div style={{display: "flex"}}>
                <Sidebar/>
                <div>
                    <Nav/>
                    <Routes/>
                </div>
            </div>
        </div>
    );
}

export default Layout;