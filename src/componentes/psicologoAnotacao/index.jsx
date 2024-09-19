"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import axios from "axios";
import api from "../../../services/api"

export default function PsicologoAnotacao() {
   const [anotacoes, setAnotacoes] = useState([]);
   const [titulo, setTitulo] = useState("");
   const [conteudo, setconteudo] = useState("");

   // Função para buscar as anotações existentes na API
   useEffect(() => {
      async function fetchAnotacoes() {
         try {
            const response = await axios.get("/psi_anotacao");
            setAnotacoes(response.data);
         } catch (error) {
            console.error("Erro ao buscar anotações:", error);
         }
      }

      fetchAnotacoes();
   }, []);

   //Função para salvar uma nova anotação

   const handleSave = async () => {
      try {
         const response = await axios.post("/psi_anotacao", {
            titulo,
            conteudo,
         });
         setAnotacoes([...anotacoes, responde.data]); // Atualiza a lista de anotações
         setTitulo("");
         setconteudo("");
      } catch (error) {
         console.error("Erro ao salvar anotação:", error);
      }
   };

   return (
      <div className={styles.container}>
         <aside className={styles.sidebar}>
            <h3>Suas Notas</h3>
            <ul className={styles.anotacoesLista}>
               {anotacoes.map((anotacao) => (
                  <li key={anotacao.id}>
                     <strong>{anotacao.data}</strong> <p>{anotacao.titulo}</p>
                  </li>
               ))}
            </ul>
         </aside>
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
               <input
                  type="text"
                  placeholder="Título"
                  className={styles.tituloInput}
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
               />
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
                        setTitulo("");
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
