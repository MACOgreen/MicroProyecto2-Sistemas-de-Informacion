import React, { useState, useEffect } from "react";
import { auth, db } from "../utils/firebase-config";

export const UserContext = React.createContext(null);


export default function UserContextProvider({ children }) {
    
    const [user, setUser] = useState(null);

    const getUserProfile = async (email) => {
      const usersRef = db.collection("users");
  
      const usersCollection = await usersRef.where("email", "==", email).get();
  
      const profile = usersCollection[0];
  
      if (!profile) return null;
  
      return {
        id: profile.id,
        ...profile.data(),
      };
      
    };

    const createUser = async (userId, data) => {
      return db
        .collection("users")
        .doc(userId)
        .set({ ...data });
    };

    // Con esto manejo el envio de nuevos usuarios a la base de datos.
    useEffect(() => { 
      auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) { 
          let profile = await getUserProfile(firebaseUser.email); // Se verifica si el usuario que se encuentra en la pagina esta en la base de datos.
  
          console.log({ profile });
  
          if (!profile) { // Si no esta en la base de datos, lo envio a la base de datos con los datos recopilados necesarios
            profile = {
              email: firebaseUser.email,
              photo: firebaseUser.photoURL,
            };
  
            await createUser(firebaseUser.uid, profile);
          }
  
          setUser(profile);
        } else {
          setUser(null);
        }
      });
      return () => {};
    }, []);


    return (
        <div>
          <UserContext.Provider
            value={{
              user,
              setUser,
            }}
          >
            {children}
          </UserContext.Provider>
        </div>
      );
}