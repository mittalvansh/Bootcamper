import React from "react";
import NavBar from "../Navbar/NavBar";

function Layout(props) {
    return (
        <div className={props.class}>
            <NavBar />
            {props.children}
        </div>
    );
}

export default Layout;