"use client"

import { AppContext } from "@/app/Context"
import searchCard from "@/components/SearchCard/page"

import axios from "axios"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const search = ({ params }) => {

    const { query } = useParams();
    let searchQuery = query.split("%20").join(" ");

    const { search } = useContext(AppContext);
    const [searchResult, setsearchResult] = search;

    const [hasMore, sethasMore] = useState(true);

    async function getSearchedImages(e) {
        try {
            let  data  = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=yTbYS3FsMkCfiiofE4FTJAhf0zpELxYK&q=${searchQuery}&limit=25&offset=${searchResult.length}&rating=g&lang=en&bundle=messaging_non_clips`)

            data.data.data.length === 0 ? sethasMore(false) : "";
            setsearchResult([...searchResult, ...data.data.data])

        } catch (error) {
            toast.error(error.message, {
                autoClose: 3000,
            });
        }
    }

    useEffect(() => {
        if (searchResult.length === 0) getSearchedImages();

    }, [searchQuery])


    return (
        <>

            <h3 className="text-center font-mono text-xl">Showing result/s for {searchQuery}</h3>
            <InfiniteScroll
                dataLength={searchResult.length}
                next={getSearchedImages}
                hasMore={hasMore}
                endMessage={
                    <p >
                        <h2 className="w-screen text-center text-xl">Yay! You have seen it all</h2>
                    </p>
                }
            >
                <div class="flex flex-wrap w-auto h-auto gap-2 py-10 px-5">

                    {searchCard()}
                </div>
            </InfiniteScroll>
            <ToastContainer />

        </>
    )
}

export default search