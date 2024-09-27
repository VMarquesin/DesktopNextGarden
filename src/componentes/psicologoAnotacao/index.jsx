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
            const response = await api.get("/psi_anotacao/");
            setAnotacoes(response.data.dados);
            console.log(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar anotações:", error);
         }
      }

      fetchAnotacoes();
   }, []);
   // function listaAnotacao(notas){
   console.log("teste", anotacoes);
   console.log(carregaPaciente.id);
   // console.log(conteudo);
   // }
   // Função para salvar uma nova anotação
   // const handleSave = async () => {
   //    try {
   //       const response = await api.post("/psi_anotacao", {
   //          titulo,
   //          psi_id: 1,
   //          pan_anotacao: conteudo,
   //          pan_anotacao_data: new Date().toISOString(),
   //          pac_id: carregaPaciente.id,
   //       });
   //       console.log("Resposta da API:", response);

   //       const novaAnotacao = {
   //          pan_id: response.pan_anotacao_data.pan_id,
   //          titulo,
   //          psi_id: 1,
   //          pan_anotacao: conteudo,
   //          pan_anotacao_data: new Date().toISOString(),
   //          pac_id: carregaPaciente.id,
   //       };

   //       setAnotacoes([...anotacoes, novaAnotacao]);
   //       setTitulo("");
   //       setConteudo("");
   //       console.log(anotacoes);
   //    } catch (error) {
   //       console.error("Erro ao salvar anotação:", error);
   //    }
   // };

   const handleSave = async (conteudo) => {
    
      try {
         const response = await api.post("/psi_anotacao", conteudo);
         console.log(response.data.dados);
      } catch (error) {
         console.log("N funcionou");
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
                     <li key={anotacao.pan_id}>
                        <p>{anotacao.pan_anotacao}</p>
                        <p>{anotacao.pan_anotacao_data}</p>
                     </li>
                  ))
               ) : (
                  <></>
               )}
               {/* 
               {Array.isArray(anotacoes) && anotacoes.length > 0 ? (
                  anotacoes.map((anotacao) => (
                     <li key={anotacao.pan_id}>
                        <strong> {new Date(anotacao.pan_anotacao_data).toLocaleDateString("pt-BR")}</strong>{" "}
                        <p>{anotacao.titulo}</p>
                     </li>
                  ))
               ) : (
                  <li>Nenhuma anotação disponível</li>
               )} */}
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
