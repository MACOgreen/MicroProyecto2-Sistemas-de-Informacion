import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ListaDefa() {

  const [pelis, setPelis] = useState([]);
  var contador=0;
  const ObtenerPelis= async()=>{ 
        
        try{
          const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie?api_key=161b9ef10670234b137c1aed586b742b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
          );
          //console.log(response.data.results);
          
          
          setPelis(response.data.results);

        }catch(error){
          console.log({ error });
        }
   }



  useEffect(() => {
    ObtenerPelis();
  }, []);

  return (
    <div>
      <ul>
        <h1 className="titulo"> Lista de peliculas  </h1>
      {pelis.map((peli) => (
          <li>
            <img src={peli.poster_path}></img>
            <h3>{peli.title}</h3>
            <h3>Lenguaje original: {peli.original_language}</h3>
            <h3> Putuacion: {peli.vote_average}</h3>
          </li>
        ))}
       </ul> 
    </div>
  )
}