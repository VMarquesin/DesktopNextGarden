"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import api from "../../../services/api";

export default function PsicologoAnotacao() {
   const [anotacoes, setAnotacoes] = useState([]);
   const [titulo, setTitulo] = useState("");
   const [conteudo, setConteudo] = useState("");

   // Função para buscar as anotações existentes na API
   useEffect(() => {
      async function fetchAnotacoes() {
         try {
            const response = await api.get("/psi_anotacao");
            setAnotacoes(response.data);
         } catch (error) {
            console.error("Erro ao buscar anotações:", error);
         }
      }

      fetchAnotacoes();
   }, []);

   // Função para salvar uma nova anotação
   const handleSave = async () => {
      try {
         const response = await api.post("/psi_anotacao", {
            // titulo,
            conteudo,
         });

         const novaAnotacao = {
            id: response.pan_id,
            // titulo,
            conteudo,
            data: new pan_anotacao_data().toISOString(),
         };

         // nova anotação

         setAnotacoes([...anotacoes, novaAnotacao]);

         // setTitulo("");
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
               {Array.isArray(anotacoes) && anotacoes.length > 0 ? (
                  anotacoes.map((anotacao) => (
                     <li key={anotacao.pan_id}>
                        <strong>{anotacao.pan_anotacao_data}</strong>{" "}
                        {/* <p>{anotacao.titulo}</p> */}
                     </li>
                  ))
               ) : (
                  <li>Nenhuma anotação disponível</li>
               )}
            </ul>
         </aside>
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
               {/* <input
                  type="text"
                  placeholder="Título"
                  className={styles.tituloInput}
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
               /> */}
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
                     onClick={() => {
                        // setTitulo("");
                        setConteudo("");
                     }}
                  >
                     Cancelar
                  </button>
               </div>
            </div>
         </main>
      </div>
   );
}
