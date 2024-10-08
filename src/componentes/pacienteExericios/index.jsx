"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./index.module.css";
import api from "../../../services/api";

export default function PacienteExercicios(pacienteId) {
   const [exercicios, setExercicios] = useState([]);
   // const [titulo, setTitulo] = useState("");
   const [conteudo, setConteudo] = useState("");
   const [pacientes, setPacientes] = useState([]);
   const [pacientesSelecionados, setPacientesSelecionados] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [showModalExercicio, setShowModalExercicio] = useState(false);

   useEffect(() => {
      async function fetchExercicios() {
         try {
            const response = await api.get("/atividade");
            setExercicios(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar atividades:", error);
            // console.log("testExercicio", setExercicios);
         }
      }

      async function fetchPacientes() {
         try {
            const response = await api.get("/pacientes");
            setPacientes(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
         }
      }

      fetchExercicios();
      fetchPacientes();
   }, [pacienteId]);

   const handleSalvarExercicio = async () => {
      try {
         // Primeiro, cadastrar a atividade
         const response = await api.post("/atividade", {
            psi_id: 1,
            ati_descricao: conteudo,
            ati_data: new Date().toISOString().split("T")[0],
         });

         const ati_id = response.data.dados;

         // Agora, associar a atividade aos pacientes selecionados
         for (const pac_id of pacientesSelecionados) {
            await api.post("/atividade_paciente", {
               ati_id: ati_id,
               pac_id: pac_id,
            });
         }

         // Atualizar a lista de exercícios e limpar o formulário
         setExercicios([
            ...exercicios,
            {
               ati_id,
               ati_descricao: conteudo,
               ati_data: new Date().toISOString().split("T")[0],
            },
         ]);
         setConteudo("");
         setPacientesSelecionados([]);
         setShowModal(false);
      } catch (error) {
         console.error("Erro ao salvar exercício:", error);
      }
   };

   // Função para liberar scroll ao faltar 200px no final da lista
   // const handleScroll = (event) => {
   //    const { scrollTop, scrollHeight, clientHeight } = event.target;
   //    if (scrollHeight - scrollTop <= clientHeight + 200) {
   //       event.target.style.overflowY = "scroll";
   //    } else {
   //       event.target.style.overflowY = "hidden";
   //    }
   // };

   const togglePacienteSelecionado = (pac_id) => {
      if (pacientesSelecionados.includes(pac_id)) {
         setPacientesSelecionados(
            pacientesSelecionados.filter((id) => id !== pac_id)
         );
      } else {
         setPacientesSelecionados([...pacientesSelecionados, pac_id]);
      }
   };
   return (
      <div className={styles.container}>
         {/* onScroll={handleScroll} */}
         <aside className={styles.sidebar}>
            <h3>EXERCÍCIOS</h3>
            <ul className={styles.anotacoesLista}>
               {exercicios.length > 0 ? (
                  exercicios.map((exercicio) => (
                     <li key={exercicio.ati_id}>
                        <p>{exercicio.ati_descricao.slice(0, 17)}...</p>
                        <strong>
                           {new Date(exercicio.ati_data).toLocaleDateString(
                              "pt-BR"
                           )}
                        </strong>
                        {/* <p>{exercicio.titulo}</p> */}
                     </li>
                  ))
               ) : (
                  <li>Nenhum exercício feito</li>
               )}
            </ul>
         </aside>
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
               {/* <input
                  type="text"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className={styles.tituloInput}
               /> */}
               <textarea
                  placeholder="Escreva a Atividade aqui..."
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  className={styles.textoArea}
               />

               <div className={styles.botoes}>
                  <button
                     className={styles.salvarButton}
                     onClick={() => setShowModal(true)}
                  >
                     Confirmar
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

         {/* Modal para selecionar pacientes */}

         {showModal && (
            <div className={styles.modal}>
               <div className={styles.modalContent}>
                  <h2>SELECIONE OS PACIENTES: </h2>
                  <ul className={styles.pacientesLista}>
                     {pacientes.length > 0 ? (
                        pacientes.map((paciente) => (
                           <li key={paciente.pac_id}>
                              <Image
                                 src={paciente.foto || "/profileDefault.jpg"}
                                 alt={paciente.nome || "Paciente"}
                                 width={50}
                                 height={50}
                              />
                              <span>{paciente.pac_id}</span>
                              <input
                                 type="checkbox"
                                 checked={pacientesSelecionados.includes(
                                    paciente.pac_id
                                 )}
                                 onChange={() =>
                                    togglePacienteSelecionado(paciente.pac_id)
                                 }
                              />
                           </li>
                        ))
                     ) : (
                        <li>Nenhum paciente disponível</li>
                     )}
                  </ul>
                  <div className={styles.modalBotoes}>
                     <button
                        className={styles.salvarButton}
                        onClick={handleSalvarExercicio}
                     >
                        Enviar Exercício
                     </button>
                     <button
                        className={styles.cancelarButton}
                        onClick={() => setShowModal(false)}
                     >
                        Cancelar
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
