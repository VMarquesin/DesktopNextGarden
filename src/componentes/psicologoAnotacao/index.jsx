"use client";

import React, { useEffect, useState } from "react";
// import { usePaciente } from "../pacienteContext";

import styles from "./index.module.css";
import api from "../../../services/api";

export default function PsicologoAnotacao(carregaPaciente) {
   // const { pacienteSelecionado } = usePaciente();

   const [anotacoes, setAnotacoes] = useState([]);
   // const [titulo, setTitulo] = useState("");
   const [conteudo, setConteudo] = useState("");

   // Função para buscar as anotações existentes na API
   useEffect(() => {
      async function fetchAnotacoes() {
         try {
            const response = await api.get("/psi_anotacao");
            console.log(response.data);
            setAnotacoes(response.data);
         } catch (error) {
            console.error("Erro ao buscar anotações:", error);
         }
      }

      fetchAnotacoes();
   }, []);
      // function listaAnotacao(notas){
         
      // }
   // Função para salvar uma nova anotação
   const handleSave = async () => {
      try {
         const response = await api.post("/psi_anotacao", {
            // titulo,
            psi_id: 1,
            pan_anotacao: conteudo,
            pan_anotacao_data: new Date().toISOString(),
            pac_id: carregaPaciente.pac_id,
         });
         console.log("Resposta da API:", response);

         const novaAnotacao = {
            pan_id: response.pan_anotacao_data.pan_id,
            // titulo,
            psi_id: 1,
            pan_anotacao: conteudo,
            pan_anotacao_data: new Date().toISOString(),
            pac_id: carregaPaciente.pac_id,
         };

         setAnotacoes([...anotacoes, novaAnotacao]);
         // setTitulo("");
         setConteudo("");
         console.log(anotacoes)
      } catch (error) {
         console.error("Erro ao salvar anotação:", error);
      }
   };

   return (
      <div className={styles.container}>
         <aside className={styles.sidebar}>
         <div>
         {carregaPaciente ? (
            <p>Paciente Selecionado: {carregaPaciente.pac_id}</p>
            
         ) : (
            <p>Nenhum paciente selecionado</p>
         )}
         
      </div>
            <h3>Suas Notas</h3>
            <ul className={styles.anotacoesLista}>
               {Array.isArray(anotacoes) && anotacoes.length > 0 ? (
                  anotacoes.map((anotacao) => (
                     <li key={anotacao.pan_id}>
                        <strong> {new Date(anotacao.pan_anotacao_data).toLocaleDateString("pt-BR")}</strong>{" "}
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
