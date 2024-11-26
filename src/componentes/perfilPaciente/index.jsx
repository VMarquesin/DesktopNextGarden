"use client";

import { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";

import api from "../../services/api";
import { UserContext } from "../../../context/userContext";

export default function PacientePerfil({ paciente }) {
   //texto da nota
   const [nota, setNota] = useState("");
   // const [statusMensagem, setStatusMensagem] = useState("");
   //informações do paciente
   const [usuario, setUsuario] = useState(null);
   //exibição do componente
   const [visivel, setVisivel] = useState(true);
   //buscando informações do psicologo
   const { psicologoInfo } = useContext(UserContext);

   //requisição das informações do paciente
   async function fetchUsuario() {
      try {
         const response = await api.get(`/usuarios/${paciente.usu_id}`);
         setUsuario(response.data.dados);
      } catch (error) {
         console.error("Erro ao buscar o usuário:", error);
      }
   }
   // só executa a busca se paciente.usu_id estiver definido
   if (paciente.usu_id) {
      fetchUsuario();
   }
   useEffect(() => {
      fetchUsuario();
   }, [paciente.usu_id]);

   // atualiza o estado nota
   const handleNoteChange = (e) => {
      setNota(e.target.value);
   };

   //post da nota feita pelo psi no perfil do pac
   const handleSaveNote = async () => {
      try {
         const response = await api.post("/psi_anotacao", {
            psicolgoId: psicologoInfo.psi_id,
            pacienteId: paciente.pac_id,
            conteudo: nota,
         });
         setStatusMensagem("Nota salva com sucesso!");
         setNota("");
      } catch (error) {
         setStatusMensagem("Erro ao salvar a nota.");
         console.error("Erro ao salvar a nota:", error);
      }
   };

   // Fecha o componente
   const handleClose = () => {
      setVisivel(false);
   };

   if (!visivel) return null; // Retorna null se o componente estiver fechado

   return (
      <div className={styles.refContainer}>
         <div className={styles.perfilContainer}>
            {/* Botão de fechar */}
            <button className={styles.closeButton} onClick={handleClose}>
               &times;
            </button>
            {/* dados do paciente */}
            <div className={styles.containerNome}>
               <div className={styles.nome}>
                  {paciente ? (
                     <>
                        <h2>{paciente.usu_nome}</h2>
                        <h3>{paciente.usu_nick}</h3>
                     </>
                  ) : (
                     <p>Carregando informações do paciente...</p>
                  )}
               </div>
            </div>
            <div className={styles.atributos}>
               <p>Telefone: {paciente.pac_telefone}</p>
               <p>Data de Nascimento: {paciente.pac_data_nasc}</p>
               <p>CPF: {paciente.pac_cpf}</p>
               <p>Filhos: {paciente.pac_filho}</p>
               <p>Escolaridade: {paciente.pac_escolaridade}</p>
               <p>Trabalho: {paciente.pac_trabalho}</p>
               <p>Estado Civil: {paciente.pac_estado_civil}</p>
            </div>
            </div>
      </div>
   );
}