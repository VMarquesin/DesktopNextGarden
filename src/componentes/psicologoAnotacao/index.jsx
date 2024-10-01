"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import api from "../../../services/api";

export default function PsicologoAnotacao(carregaPaciente) {
   const [anotacoes, setAnotacoes] = useState([]);
   const [conteudo, setConteudo] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAnotacao, setSelectedAnotacao] = useState(null);
   
   // Função para buscar as anotações existentes na API
   useEffect(() => {
      async function fetchAnotacoes() {
         try {
            const response = await api.get(`/psi_anotacao/${carregaPaciente}`);
            setAnotacoes(response.data.dados);
            console.log(carregaPaciente,"i don't know")
         } catch (error) {
            console.error("Erro ao buscar anotações:", error);
         }
      }

      fetchAnotacoes();
   }, []);

   // Função para abrir o modal com a anotação selecionada
   const openModal = (anotacao) => {
      setSelectedAnotacao(anotacao);
      setIsModalOpen(true);
   };

   // Função para fechar o modal
   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedAnotacao(null);
   };

   // Função para salvar uma nova anotação
   const handleSave = async () => {
      if (!conteudo || !carregaPaciente?.id) {
         console.error("Conteúdo da anotação ou paciente não definido.");
         return;
      }

      try {
         const response = await api.post("/psi_anotacao", {
            psi_id: 1, // ID do psicólogo (ajuste conforme necessário)
            pan_anotacao: conteudo,
            pan_anotacao_data: new Date().toISOString(),
            pac_id: carregaPaciente.id, // ID do paciente selecionado
         });

         const novaAnotacao = {
            pan_id: response.data.dados.pan_id,
            pan_anotacao: conteudo,
            pan_anotacao_data: new Date().toISOString(),
            pac_id: carregaPaciente.id,
         };

         setAnotacoes([...anotacoes, novaAnotacao]);
         setConteudo(""); // Limpa o campo após o salvamento
      } catch (error) {
         console.error("Erro ao salvar anotação:", error);
      }
   };

   return (
      <div className={styles.container}>
         <aside className={styles.sidebar}>
            <div>
               {carregaPaciente ? (
                  <p>Paciente Selecionado: {carregaPaciente.id}</p>
               ) : (
                  <p>Nenhum paciente selecionado</p>
               )}
            </div>
            <h3>Suas Notas</h3>
            <ul className={styles.anotacoesLista}>
               {anotacoes.length > 0 ? (
                  anotacoes.map((anotacao) => (
                     <li
                        key={anotacao.pan_id}
                        onClick={() => openModal(anotacao)}
                     >
                        <p>{anotacao.pan_anotacao}</p>
                        <p>
                           {new Date(
                              anotacao.pan_anotacao_data
                           ).toLocaleDateString("pt-BR")}
                        </p>
                     </li>
                  ))
               ) : (
                  <></>
               )}
            </ul>
         </aside>
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
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

         {/* Modal */}
         {isModalOpen && (
            <div className={styles.modalOverlay}>
               <div className={styles.modalContent}>
                  <h3>Anotação</h3>
                  <p>{selectedAnotacao?.pan_anotacao}</p>
                  <p>
                     {new Date(
                        selectedAnotacao?.pan_anotacao_data
                     ).toLocaleDateString("pt-BR")}
                  </p>
                  <button className={styles.closeButton} onClick={closeModal}>
                     Fechar
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
