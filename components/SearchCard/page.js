"use client";

import { AppContext } from "@/app/Context";
import Link from "next/link";
import { useContext, useState } from "react";

const searchCard = () => {

  const { search } = useContext(AppContext);
  const [images, setimages] = search;

  return (
    <>
      {images.length > 0 ? images.map((image, idx) => {

        return <div key={image.id} className="relative group">
          <Link href={`/image/${image.id}`}>  <video autoPlay loop muted src={image.images.fixed_height.mp4} alt="" className="mb-5" /></Link>

        </div>
      }) : <div>
        <div className="grid gap-8 py-8 ">
          <div class="animate-pulse space-y-2 ">
            <div class="bg-gray-200  h-72 "></div>
          </div>

          <div class="animate-pulse space-y-2 ">
            <div class="bg-gray-200  h-72 "></div>
          </div>
          <div class="animate-pulse space-y-2 ">
            <div class="bg-gray-200  h-72 "></div>
          </div>
          <div class="animate-pulse space-y-2 ">
            <div class="bg-gray-200  h-72 "></div>
          </div>
          <div class="animate-pulse space-y-2 ">
            <div class="bg-gray-200  h-72 "></div>
          </div>
          <div class="animate-pulse space-y-2 ">
            <div class="bg-gray-200  h-72 "></div>
          </div>
          <div class="animate-pulse space-y-2 ">
            <div class="bg-gray-200  h-72 "></div>
          </div>
        </div>
      </div>}

    </>
  )
}

export default searchCard