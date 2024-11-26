"use client";

import React, { useEffect, useState, useContext } from "react";
import styles from "./index.module.css";
import api from "../../services/api";
import { UserContext } from "../../../context/userContext";

//compoenente recebe paciente como prop, sendo o paciente selecionado
export default function PsicologoAnotacao({ paciente }) {
   //lista de anotações
   const [anotacoes, setAnotacoes] = useState([]);
   //conteúdo da anotação
   const [conteudo, setConteudo] = useState("");
   //visibilidade do modal
   const [isModalOpen, setIsModalOpen] = useState(false);
   //armazena a notação
   const [selectedAnotacao, setSelectedAnotacao] = useState(null);
   //modal no modo edição
   const [isEditMode, setIsEditMode] = useState(false);
   //buscando informações do psicologo
   const { psicologoInfo } = useContext(UserContext);

   // função para deletar anotações feitas
   async function fetchDeletarAnotacoes(pan_id) {
      try {
         await api.delete(`/psi_anotacao/${pan_id}`);
         setAnotacoes((prevAnotacoes) =>
            prevAnotacoes.filter((anotacoes) => anotacoes.pan_id !== pan_id)
         );
         setIsModalOpen(false);
      } catch (error) {
         console.error("Houve um problema ao deletar a anotação", error);
      }
   }

   //carregar as anotações
   async function fetchAnotacoes() {
      try {
         console.log(paciente);
         console.log("pac_id ", paciente.pac_id);
         const response = await api.get(`/psi_anotacao/${paciente.pac_id}`);
         setAnotacoes(response.data.dados);
      } catch (error) {
         console.error("Erro ao buscar anotações:", error);
      }
   }
   useEffect(() => {
      fetchAnotacoes();
   }, [paciente]);
   
   //abrir a anotação
   const openModal = (anotacao) => {
      setSelectedAnotacao(anotacao);
      setConteudo(anotacao.pan_anotacao); // Preenche o conteúdo com a anotação selecionada
      setIsEditMode(false);
      setIsModalOpen(true);
   };
   //reset dos estados relacionados ao modal
   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedAnotacao(null);
      setConteudo("");
      setIsEditMode(false);
   };

   const handleSave = async () => {
      if (!conteudo || !paciente.pac_id) {
         console.error("Conteúdo da anotação ou paciente não definido.");
         return;
      }
      //post para criar nova anotação
      try {
         const response = await api.post("/psi_anotacao", {
            psi_id: psicologoInfo.psi_id,
            pan_anotacao: conteudo,
            pan_anotacao_data: new Date().toISOString().split("T")[0],
            pac_id: paciente.pac_id,
         });

         const novaAnotacao = response.data.dados;
         // Atualiza a lista de anotações após salvar
         setAnotacoes((prevAnotacoes) => [
            novaAnotacao,
            selectedAnotacao
               ? prevAnotacoes.map((anotacao) =>
                    anotacao.pan_id === selectedAnotacao.pan_id
                       ? { ...anotacao, pan_anotacao: conteudo }
                       : anotacao
                 )
               : prevAnotacoes,
         ]);
         fetchAnotacoes();
         closeModal(); // Fecha o modal após salvar
      } catch (error) {
         console.error("Erro ao salvar anotação:", error);
      }
   };

   return (
      <div className={styles.container}>
         {/* lista de todas anotações */}
         <aside className={styles.sidebar}>
            <h3>SUAS NOTAS</h3>
            <ul className={styles.anotacoesLista}>
               {anotacoes.length > 0 ? (
                  anotacoes.map((anotacao) => (
                     <li
                        key={anotacao.pan_id}
                        onClick={() => openModal(anotacao)}
                     >
                        <p>
                           {anotacao?.pan_anotacao?.slice(0, 22) ||
                              "Sem anotação"}
                        </p>

                        <p>
                           {new Date(
                              anotacao.pan_anotacao_data
                           ).toLocaleDateString("pt-BR")}
                        </p>
                     </li>
                  ))
               ) : (
                  <p>Selecione um paciente</p>
               )}
            </ul>
         </aside>
         {/* área para criar novas anotações */}
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
               <header className={styles.header}>
                  <h2>Anotações</h2>
                  <p>
                     {new Date().toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                     })}
                  </p>
               </header>
               <textarea
                  placeholder="Escreva suas anotações aqui..."
                  className={styles.textoArea}
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
               />
               <div className={styles.botoes}>
                  <button className={styles.salvarButton} onClick={handleSave}>
                     Salvar
                  </button>
                  <button
                     className={styles.cancelarButton}
                     onClick={() => setConteudo("")}
                  >
                     Cancelar
                  </button>
               </div>
            </div>
         </main>
         {/* modal da anotação */}
         {isModalOpen && (
            <div className={styles.modalOverlay}>
               <div className={styles.modalContent}>
                  <h3 className={styles.modalTitulo}>Detalhes da Anotação</h3>
                  {isEditMode ? (
                     // Modo de edição
                     <textarea
                        className={styles.textoArea}
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                     />
                  ) : (
                     // Modo de visualização
                     <p className={styles.modalTexto}>
                        {selectedAnotacao?.pan_anotacao}
                     </p>
                  )}
                  <p className={styles.modalData}>
                     {new Date(
                        selectedAnotacao?.pan_anotacao_data
                     ).toLocaleDateString("pt-BR")}
                  </p>

                  <div className={styles.modalButtons}>
                     {isEditMode ? (
                        <button
                           className={styles.salvarButton}
                           onClick={handleSave}
                        >
                           Salvar
                        </button>
                     ) : (
                        <button
                           className={styles.editarButton}
                           onClick={() => setIsEditMode(true)}
                        >
                           Editar
                        </button>
                     )}
                     <button
                        className={styles.closeButton}
                        onClick={closeModal}
                     >
                        Fechar
                     </button>
                     <button
                        className={styles.closeButton}
                        onClick={() =>
                           fetchDeletarAnotacoes(selectedAnotacao.pan_id)
                        }
                     >
                        Apagar
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}