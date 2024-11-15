"use client";

import api from "../src/services/api";
import { useEffect, useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [psicologoInfo, setPsicologoInfo] = useState(null);
   const [error, setError] = useState(null);

   const logout = () => {
      window.localStorage.setItem("user", null);
      setPsicologoInfo(null);
   };

   const saveUserLocalStorage = (user) => {
      window.localStorage.setItem("user", JSON.stringify(user));
   };

   useEffect(() => {
      const psiInfo = window.localStorage.getItem("user");

      if (psiInfo) setPsicologoInfo(JSON.parse(psiInfo));
   }, []);

   const fetchPsicologoInfo = async () => {
      try {
         // Recupera o usuário logado do localStorage
         // const storedUser = localStorage.getItem("user");
         // if (!storedUser) return;

         // const { id: usu_id, psi_id } = JSON.parse(storedUser);

         // Faz a requisição com o id do usuário logado
         const usuarioResponse = await api.get(`/usuario/${usu_id}`);
         const psicologoResponse = await api.get(`/psicologo/${psi_id}`);

         // Atualiza o estado com as informações combinadas do usuário e psicólogo
         setPsicologoInfo({
            ...usuarioResponse.data.dados[0],
            ...psicologoResponse.data.dados[0],
         });
      } catch (error) {
         console.error("Erro ao buscar informações do psicólogo:", error);
      }
   };

   const login_psicologo = async (email, password) => {
      try {
         const response = await api.post("/usuarios/login", {
            usu_email: email,
            usu_senha: password,
         });
         const [psiDados] = response.data.dados;

         setPsicologoInfo({
            psi_id: psiDados.psi_id,
            usu_id: psiDados.usu_id,
            usu_nome: psiDados.usu_nome,
         });

         setError(null);
         saveUserLocalStorage(psiDados);
         return true;
      } catch (error) {
         setError("Login e/ou senha errados!");
         return false;
      }
   };

   return (
      <UserContext.Provider
         value={{ psicologoInfo, login_psicologo, error, logout }}
      >
         {children}
      </UserContext.Provider>
   );
};

export { UserContext, UserProvider };
