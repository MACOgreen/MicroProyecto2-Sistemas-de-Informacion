
import axios from "axios";
import React, { useState, useEffect } from "react";
import Lista8 from "./lista8";
import Estrenos from"./estrenos";
export default function homePage() {
  const [pelis, setPelis] = useState([]);
  var contador=0;
  const ObtenerPelis= async()=>{ 
        const arreglos=[];
        try{
          const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie?api_key=161b9ef10670234b137c1aed586b742b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
          );
          //console.log(response.data.results);
          for( let i =0;i<8; i++){
            arreglos.push({ ...response.data.results[i]});
          }
          console.log(arreglos);
          setPelis(arreglos);

        }catch(error){
          console.log({ error });
        }
  }



  useEffect(() => {
    ObtenerPelis();
  }, []);



  return (
    <div>   
       < Lista8/>
       <Estrenos/>
    </div>   

     
    
  )
  
}
