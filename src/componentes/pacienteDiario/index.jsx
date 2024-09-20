"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // para chamadas à API

import Image from "next/image";
import styles from "./index.module.css";

import api from "../../../services/api";

export default function DiarioPaciente({ dia_id, pac_id }) {
   const [notas, setNotas] = useState([]); // Inicializa como array vazio
   const [notaSelecionada, setNotaSelecionada] = useState(null);
   const [paciente, setPaciente] = useState(null);

   // Chamada à API para buscar as notas do paciente
   useEffect(() => {
      async function fetchNotas() {
         try {
            const response = await api.get(`/diario/2`);
            // Garante que sempre será um array, mesmo que a resposta não seja
            setNotas(Array.isArray(response.data) ? response.data : []);
         } catch (error) {
            console.error("Erro ao buscar notas:", error);
            setNotas([]); // Caso ocorra erro, mantém como array vazio
         }
      }

      async function fetchPaciente() {
         try {
            const response = await api.get(`/paciente/5`);
            setPaciente(response.data);
         } catch (error) {
            console.error("Erro ao buscar paciente:", error);
         }
      }

      fetchNotas();
      fetchPaciente();
   }, [dia_id, pac_id]);

   return (
      <div className={styles.container}>
         {/* Sidebar */}
         <aside className={styles.sidebar}>
            <h3>Notas do Diário</h3>
            <ul>
               {notas.length > 0 ? (
                  notas.map((nota) => (
                     <li
                        key={nota.dia_id}
                        onClick={() => setNotaSelecionada(nota)}
                        className={styles.notaItem}
                     >
                        <p>{new Date(nota.dia_data).toLocaleDateString()}</p>
                        <p>{nota.conteudo.slice(0, 20)}...</p>
                     </li>
                  ))
               ) : (
                  <li>Nenhuma nota encontrada</li>
               )}
            </ul>
         </aside>

         {/* Área de visualização */}
         <section className={styles.visualizacaoNota}>
            {notaSelecionada ? (
               <div className={styles.notaDetalhada}>
                  <header className={styles.notaHeader}>
                     {paciente && (
                        <>
                           <Image
                              src={paciente.foto}
                              alt={paciente.usu_nome}
                              width={50}
                              height={50}
                              className={styles.fotoPaciente}
                           />
                           <div className={styles.informacoesPaciente}>
                              <h2>{paciente.usu_nome}</h2>
                              <p>{new Date(notaSelecionada.dia_data).toLocaleDateString()}</p>
                           </div>
                        </>
                     )}
                  </header>
                  <div className={styles.conteudoNota}>
                     <p>{notaSelecionada.conteudo}</p>
                  </div>
               </div>
            ) : (
               <p className={styles.avisoNota}>Selecione uma nota para visualizar</p>
            )}
         </section>
      </div>
   );
}
