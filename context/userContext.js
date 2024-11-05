'use client';

import api from "../src/services/api";
import { useEffect, useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [psicologoInfo, setPsicologoInfo] = useState(null);

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

  useEffect(() => {
    fetchPsicologoInfo();
  }, []);

  return (
    <UserContext.Provider value={{ psicologoInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
