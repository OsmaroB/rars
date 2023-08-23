import Sidebar from "containers/navs/Sidebar";
import React from "react";
// import Sidebar from "containers/navs/Sidebar";

const SalesLayout = ({children}) => {
    return(
        <div>
            <Sidebar />
            <main>
                {children}
            </main>
        </div>
    )
};

export default SalesLayout;