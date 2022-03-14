import React from 'react'
import { useContext,useEffect } from "react";
import {useForm } from "react-hook-form";
import { useState} from "react";
import './stylesR.css';
import {db,auth,googleProvider,emailProvider}  from "../../utils/firebase-config";



import { v4 as uuidv4 } from 'uuid';  // Import para generar ID para los usuarios de formulario.
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


export default function registro() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]); //Contenedor 

  const{register,handleSubmit, formState: { errors }}=useForm();

  //Conexion con la fireBase
  const fetchUsuarios= async ()=>{ // Enganio para ejecutar codigo asincrono dentro useEffect
    try{
        const arr = [];
        const usuarioRef =db.collection("users"); //referencia a la seccion Usuarios de la base de datos
        const response= await usuarioRef.get();

        response.docs.forEach((element)=> {
            console.log({ data: element.data() });
            arr.push({ ...element.data() });

        });

        setUsuarios(arr); //Actualizo Usuarios
        

    }catch(error){
        console.log({ error });
    }

};

//Funcion para registro normal
  const regisNormal= async (data)=> {
    console.log("supuesto");
    

    //Validacion de que los nuevos datos no esten en el sistema.
    var bol=true; //Variable que confirma si un usuario se encuentra registrado o no. 
    usuarios.forEach((element)=>{
      if(data.email==element.email){
            alert("Este usuario ya se encuentra registrado en el sistema. Inicie sesion.");
            bol=false;
            navigate("/login");
      }
    });

    if(bol){
        setUser(data);
        alert("Se registro en el sistema exitosamente.");
        navigate("/");
        return  db
        .collection("users")
        .doc(uuidv4()) //Generar ID para usuario.
        .set({ ...data });
        
    }
  }  
  
  


  useEffect(()=>{  // Me permite programa para que lo que este entre {} se ejecute apenas iniciar la vista
        
        fetchUsuarios();
        
  },[])




  return (
    <div className='content'>
            
            <div className= 'reg'> 
                <form className='form' onSubmit={handleSubmit((data)=>{ regisNormal(data);})}>

                    <h1 className='headerReg'>Ingrese su correo electronico</h1>
                    <div className="form-group">
                        <label htmlFor="username">Correo electronico</label>
                        <input type="text" {... register("email",{required:"Un correo electronico es necesario"})} placeholder="Ingrese su correo..." />
                        <p className='mensajeR'>{errors.email?.message}</p>
                    </div>

                    <h1 className='headerReg'>Crea una clave</h1>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" {... register ("password",{required:"Una clave es necesaria"})} placeholder="Ingrese su contraseña..." />
                        <p className='mensajeR'>{errors.password?.message}</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password2">Confirme la cotraseña</label>
                        <input type="password2" {... register ('password2',{required:"La confirmacion de la clave es necesaria."})} placeholder="Ingrese su contraseña..." />
                        <p className='mensajeR'> {errors.password2?.message}</p>
              
                    </div>
                    
                    <div className='footerReg'>
                        <button type='submit' className='btnReg'>
                            Registrarse
                        </button> 
                    </div> 

                </form>

            </div>
        </div>


    
  )
}
