'use client';

import api from "../src/services/api";
import { useEffect, useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [psicologoInfo, setPsicologoInfo] = useState(null);
  const [error, setError] = useState(null)

  const fetchPsicologoInfo = async () => {
    try {
      // Recupera o usuário logado do localStorage
      // const storedUser = localStorage.getItem("user");
      // if (!storedUser) return;

      // const { id: usu_id, psi_id } = JSON.parse(storedUser);


      const usu_id = 10;
      const psi_id = 1;
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
    try{
      const response = await api.post('/usuarios/login', {usu_email: email, usu_senha: password})
      const [psiDados] = response.data.dados

      setPsicologoInfo({
        psi_id: psiDados.psi_id,
        usu_id: psiDados.usu_id,
        usu_nome: psiDados.usu_nome
      })

      setError(null)
      return true
    } catch(error){
      setError("Login e/ou senha errados!")
      return false
    }
      
  }

  return (
    <UserContext.Provider value={{ psicologoInfo, login_psicologo, error }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
