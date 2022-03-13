import axios from "axios";
import React, { useState, useEffect } from "react";
import "./disenios.css";
export default function Estrenos() {

  const [pelis, setPelis] = useState([]);
  const ObtenerPelis= async()=>{ 
        const arreglos=[];
        try{
          const response = await axios.get(
            "https://api.themoviedb.org/3/movie/upcoming?api_key=161b9ef10670234b137c1aed586b742b&language=en-US&page=1"
          );
          console.log(response.data.results);
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
      <ul>
        <h1 className="titulo">  Proximos estrenos  </h1>
      {pelis.map((peli) => (
          <li>
            <img src={peli.poster_path}></img>
            <h3>{peli.title}</h3>
            <h3>Lenguaje original: {peli.original_language}</h3>
            <h3> Estreno: {peli.release_date}</h3>
          </li>
        ))}
       </ul> 
    </div>
  )
}