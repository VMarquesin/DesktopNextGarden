"use client";

import { useState, useEffect } from "react";
import styles from "./index.module.css";
import api from "../../services/api";

export default function DiarioPaciente({ pacienteId }) {
   //armazena as notas do diário
   const [notas, setNotas] = useState([]);
   //nota clicada na interface
   const [notaSelecionada, setNotaSelecionada] = useState(null);
   //informações do paciente
   const [paciente, setPaciente] = useState(null);

   //buscar as notas do paciente
   useEffect(() => {
      //busca de diarios do paciente
      async function fetchNotas() {
         try {
            const response = await api.get(`/diario/${pacienteId}`);
            console.log(response.data.dados);
            setNotas(response.data.dados || []);
         } catch (error) {
            console.error("Erro ao buscar notas:", error);
            setNotas([]);
         }
      }
      //informações do paciente
      async function fetchPaciente() {
         try {
            const response = await api.get(`/pacientes`);
            console.log(response.data.dados);
            setPaciente(response.data.dados || null);
         } catch (error) {
            console.error("Erro ao buscar paciente:", error);
         }
      }

      fetchNotas();
      fetchPaciente();
   }, [pacienteId]); //chamado toda vez que pacienteId mudar

   return (
      <div className={styles.container}>
         {/* lista das notas do diário */}
         <aside className={styles.sidebar}>
            <h3>NOTAS DO DIÁRIO</h3>
            <ul className={styles.diarioLista}>
               {notas.length > 0 ? (
                  notas.map((nota) => (
                     <li
                        key={nota.dia_id}
                        onClick={() => setNotaSelecionada(nota)}
                        className={
                           notaSelecionada?.dia_id === nota.dia_id
                              ? styles.activeDiario
                              : " "
                        }
                     >
                        <p>{nota.dia_relato.slice(0, 17)}...</p>
                        <p>
                           {new Date(nota.dia_data).toLocaleDateString("pt-BR")}
                        </p>
                     </li>
                  ))
               ) : (
                  <p>Selecione um paciente</p>
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
                           <div className={styles.informacoesPaciente}>
                              {/* <h2>{usuario.usu_nome}</h2> */}
                              <p>
                                 {new Date(
                                    notaSelecionada.dia_data
                                 ).toLocaleDateString("pt-BR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                 })}
                              </p>
                           </div>
                        </>
                     )}
                  </header>
                  <div className={styles.conteudoNota}>
                     {notaSelecionada.dia_relato ? (
                        <p>{notaSelecionada.dia_relato}</p>
                     ) : (
                        <p>Sem conteúdo disponível para esta nota.</p>
                     )}
                  </div>
               </div>
            ) : (
               <p className={styles.avisoNota}>
                  Selecione uma nota para visualizar
               </p>
            )}
         </section>
      </div>
   );
}
