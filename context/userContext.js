"use client";

import api from "../src/services/api";
import { useEffect, useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [psicologoInfo, setPsicologoInfo] = useState(null);
   const [error, setError] = useState(null);

   // limpa as informações do psi
   const logout = () => {
      window.localStorage.setItem("user", null);
      setPsicologoInfo(null);
   };

   //salva info do usu no localStorage como string JSON
   const saveUserLocalStorage = (user) => {
      window.localStorage.setItem("user", JSON.stringify(user));
   };

   //verifica o localStorage para salvar as informações em psiInfo
   useEffect(() => {
      const psiInfo = window.localStorage.getItem("user");
      if (psiInfo) setPsicologoInfo(JSON.parse(psiInfo));
   }, []);

   // atualizar ou puxar dados do psicologo após o login
   const fetchPsicologoInfo = async () => {
      try {
         // Faz a requisição de acordo o login feito
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

   // post na rota de login
   const login_psicologo = async (email, password) => {
      try {
         const response = await api.post("/usuarios/login", {
            usu_email: email,
            usu_senha: password,
         });

         // salva no localStorage as informações do usu
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

   // torna acessivel aos componentes filhos
   return (
      <UserContext.Provider
         value={{ psicologoInfo, login_psicologo, error, logout }}
      >
         {children}
      </UserContext.Provider>
   );
};

export { UserContext, UserProvider };
