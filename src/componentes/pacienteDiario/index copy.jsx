"use cliente";

import { useState, useEffect } from "react";
import axios from "axios"; // para chamadas à API

import Image from "next/image";
import styles from "./index.module.css";

import api from "../../../services/api";

export default function DiarioPaciente({ dia_id, pac_id }) {
   const [notas, setNotas] = useState([]);
   const [notaSelecionada, setNotaSelecionada] = useState(null);
   const [paciente, setPaciente] = useState(null);

   // Chamada à API para buscar as notas do paciente
   useEffect(() => {
      async function fetchNotas() {
         try {
            const response = await api.get(`/diario/2`);
            setNotas(response.data);
         } catch (error) {
            console.error("Erro ao buscar notas:", error);
         }
      }

      async function fetchPaciente() {
         try {
            const response = await api.get(`/paciente/${pac_id}`);
            setPaciente(response.data);
         } catch (error) {
            console.error("Erro ao buscar paciente:", error);
         }
      }

      fetchNotas();
      fetchPaciente();
   }, [dia_id]);

   return (
      <div className={styles.container}>
         {/* Sidebar */}
         <aside className={styles.sidebar}>
            <h3>Notas do Diário</h3>
            <ul>
               {notas.map((nota) => (
                  <li
                     key={nota.dia_id}
                     onClick={() => setNotaSelecionada(nota)}
                  >
                     <p>{nota.dia_data}</p>
                     <p>{nota.conteudo.slice(0, 15)}...</p>{" "}
                     {/* Mostra os primeiros 20 caracteres */}
                  </li>
               ))}
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
                              alt={paciente.nome}
                              width={50}
                              height={50}
                              className={styles.fotoPaciente}
                           />
                           <div className={styles.informacoesPaciente}>
                              <h2>{paciente.usu_nome}</h2>
                              {/* tem que associar a tabela usuarios ou ja push of pacientes? */}
                              <p>{notaSelecionada.dia_data}</p>
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
