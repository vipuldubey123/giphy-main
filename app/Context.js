"use client";
import navbar from "@/components/Navbar/page";
import { createContext, useState } from "react";


export const AppContext = createContext(null); 

const CentralData = (props) => {
    const [data, setData] = useState([])
    const [searchResult, setsearchResult] = useState([])
    const [favorite, setfavorite] = useState([])
    return (
        <AppContext.Provider value={{
            trending: [data, setData],
            search: [searchResult, setsearchResult],
            favorite: [favorite, setfavorite]

        
        }}>
            {navbar(searchResult)}
            {props.children}
        </AppContext.Provider>
    );
};

export default CentralData;
