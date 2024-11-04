'use client'

import api from "../src/services/api";

import { useEffect, useState } from "react";
import { createContext } from "react";

const UserContext = createContext()


const UserProvider = ({children}) =>
{
    const [psicologoInfo, setPsicologoInfo] = useState(null);

    const fetchPsicologoInfo = async () => {
        try {
           const usu_id = 15;
           const psi_id = 15;
           const usuarioResponse = await api.get(`/usuario/${usu_id}`);
           const psicologoResponse = await api.get(`/psicologo/${psi_id}`);

           console.log(usuarioResponse)
  
           setPsicologoInfo({
              ...usuarioResponse.data.dados[0],
              ...psicologoResponse.data.dados[0],
           });
        } catch (error) {
           console.error("Erro ao buscar informações do psicólogo:", error);
        }
     };

     useEffect(()=>{
        fetchPsicologoInfo()
     }, [])

    return <UserContext.Provider value={{psicologoInfo}}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserProvider}

