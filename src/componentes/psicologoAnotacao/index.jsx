"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import api from "../../../services/api";

export default function PsicologoAnotacao({ pacienteId }) {
   const [anotacoes, setAnotacoes] = useState([]);
   const [conteudo, setConteudo] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAnotacao, setSelectedAnotacao] = useState(null);

   useEffect(() => {
      async function fetchAnotacoes() {
         try {
            const response = await api.get(`/psi_anotacao/${pacienteId}`);
            setAnotacoes(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar anotações:", error);
         }
      }

      fetchAnotacoes();
   }, [pacienteId]);

   const openModal = (anotacao) => {
      setSelectedAnotacao(anotacao);
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedAnotacao(null);
   };

   const handleSave = async () => {
      if (!conteudo || !pacienteId) {
         console.error("Conteúdo da anotação ou paciente não definido.");
         return;
      }

      try {
         console.log(new Date().toISOString());
         const response = await api.post("/psi_anotacao", {
            psi_id: 1,
            pan_anotacao: conteudo,
            pan_anotacao_data: new Date().toISOString().split('T')[0],
            pac_id: pacienteId,
         });

         const novaAnotacao = {
            pan_id: response.data.dados.pan_id,
            pan_anotacao: conteudo,
            pan_anotacao_data: new Date().toISOString().split('T')[0],
            pac_id: pacienteId,
         };

         setAnotacoes([...anotacoes, novaAnotacao]);
         setConteudo("");
      } catch (error) {
         console.error("Erro ao salvar anotação:", error);
      }
   };

   return (
      <div className={styles.container}>
         <aside className={styles.sidebar}>
            <h3>Suas Notas</h3>
            <ul className={styles.anotacoesLista}>
               {anotacoes.length > 0 ? (
                  anotacoes.map((anotacao) => (
                     <li
                        key={anotacao.pan_id}
                        onClick={() => openModal(anotacao)}
                     >
                        <p>{anotacao.pan_anotacao.slice(0, 17)}...</p>
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
