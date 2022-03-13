
import ListaDefa from "./listaDefa";
import React, { useState, useEffect } from "react";
import {useForm } from "react-hook-form";
import axios from "axios";

export default function peliL() {
  const [bol,setBol]=useState(false);
  const [rem,setRem]=useState(" ");
  const [pelis, setPelis] = useState([]);
  const{register,handleSubmit, formState: { errors }}=useForm();

  const ObtenerBusqueda= async(data)=>{ 
    let primero= "https://api.themoviedb.org/3/search/movie?api_key=161b9ef10670234b137c1aed586b742b&language=en-US&query=";
    let segundo= "&page=1&include_adult=false"  ; 
    let url=primero+data+segundo;

    console.log(url);
    try{
        if (bol) {
          const response = await axios.get(
            url
          );
          console.log(response.data.results);
          
          setPelis(response.data.results);
        }
        else{
          const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie?api_key=161b9ef10670234b137c1aed586b742b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
          );
          setPelis(response.data.results);
        }
          

    }catch(error){
      console.log({ error });
    }
  }

  useEffect((rem) => {
    alert("Darle dos veces al boton de busqueda al momento de buscar. Error a ultima hora.");
    ObtenerBusqueda(rem);
    
  }, []);



  return (
    <div>
        <form onSubmit={handleSubmit((data)=>{setRem(data.bus); setBol(true);ObtenerBusqueda(data.bus)})}>
          <div >
                    <label className='etiqueta' htmlFor="bus">Busqueda</label>
                    <input  type="texto"  {... register("bus")}    placeholder='ingrese una palabras o nombres..'/>     
          </div>
              <button  className='boton' type='submit' >
                      Realizar busqueda
              </button>

        </form>
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
