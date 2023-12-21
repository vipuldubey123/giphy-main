'use client'
import React, { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "@/app/Context";
import favoriteCard from "@/components/favoriteCard/page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';

const page = () => {
  
  const { favorite } = useContext(AppContext);
    const [fav, setfav] = favorite;
    
    const [user] = useAuthState(auth);
  const router = useRouter()

  

    useEffect(() => {
        const fetchFavoriteGIFs = async () => {
            try {
                // Get favorite IDs from local storage
                const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

                // Construct comma-separated string of IDs
                const idsString = existingFavorites.join(',');

                // Make the API call only if there are IDs in favorites
                if (idsString) {
                  const response = await axios.get(`https://api.giphy.com/v1/gifs?api_key=yTbYS3FsMkCfiiofE4FTJAhf0zpELxYK&ids=${idsString}&rating=g`);
                  
                  setfav([...response.data.data])

                  if (!user ){
                    router.push('/signin')
                  }
                  
                }
            } catch (error) {
                console.error("Error fetching favorite GIFs:", error);
            }
        };

        fetchFavoriteGIFs();
    }, [setfav]);
  

    return (
      <>

      <h3 className="text-center font-mono text-xl">Showing Favorite/s</h3>
            <div className="flex flex-wrap w-auto h-auto gap-2 py-10 px-5">
                
                { 
                   favoriteCard()
                }

          </div>
      <ToastContainer />

  </>
    );
};

export default page;
