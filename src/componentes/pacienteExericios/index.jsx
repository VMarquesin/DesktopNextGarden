"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Para conectar à API
import Image from "next/image";
import styles from "./index.module.css";

export default function PacienteExercicios() {
   const [exercicios, setExercicios] = useState([]); // Exercícios passados
   const [titulo, setTitulo] = useState(""); // Título do novo exercício
   const [conteudo, setConteudo] = useState(""); // Conteúdo do novo exercício
   const [pacientes, setPacientes] = useState([]); // Lista de pacientes da API
   const [pacientesSelecionados, setPacientesSelecionados] = useState([]); // Pacientes selecionados
   const [showModal, setShowModal] = useState(false); // Controle da exibição da modal

   // Função para buscar exercícios antigos da API
   useEffect(() => {
      async function fetchExercicios() {
         try {
            const response = await axios.get("/exercicios");
            setExercicios(response.data);
         } catch (error) {
            console.error("Erro ao buscar exercícios:", error);
         }
      }

      // Função para buscar a lista de pacientes
      async function fetchPacientes() {
         try {
            const response = await axios.get("/pacientes");
            setPacientes(response.data);
         } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
         }
      }

      fetchExercicios();
      fetchPacientes();
   }, []);

   // Função para salvar novo exercício
   const handleSalvarExercicio = async () => {
      try {
         const response = await axios.post("/exercicios", {
            titulo,
            conteudo,
            pacientes: pacientesSelecionados,
         });
         setExercicios([...exercicios, response.data]); // Adiciona o novo exercício à lista de exercícios passados
         setTitulo(""); // Limpa o campo do título
         setConteudo(""); // Limpa o campo do conteúdo
         setShowModal(false); // Fecha a modal após salvar
      } catch (error) {
         console.error("Erro ao salvar exercício:", error);
      }
   };

   // Função para liberar scroll ao faltar 200px no final da lista
   const handleScroll = (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollHeight - scrollTop <= clientHeight + 200) {
         event.target.style.overflowY = "scroll";
      } else {
         event.target.style.overflowY = "hidden";
      }
   };

   // Função para lidar com a seleção de pacientes
   const togglePacienteSelecionado = (pacienteId) => {
      if (pacientesSelecionados.includes(pacienteId)) {
         setPacientesSelecionados(
            pacientesSelecionados.filter((id) => id !== pacienteId)
         );
      } else {
         setPacientesSelecionados([...pacientesSelecionados, pacienteId]);
      }
   };
   return (
      <div className={styles.container}>
         <aside className={styles.sidebar} onScroll={handleScroll}>
            <h3>Exercícios</h3>
            <ul className={styles.anotacoesLista}>
               {exercicios.map((exercicio) => (
                  <li key={exercicio.id}>
                     <strong>{exercicio.data}</strong>
                     <p>{exercicio.titulo}</p>
                  </li>
               ))}
            </ul>
         </aside>
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
               <input
                  type="text"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className={styles.tituloInput}
               />
               <textarea
                  placeholder="Escreva a Atividade aqui..."
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  className={styles.textoArea}
               />

               <div className={styles.botoes}>
                  <button
                     className={styles.salvarButton}
                     onClick={() => setShowModal(true)} // Abre modal ao clicar em Confirmar
                  >
                     Confirmar
                  </button>
                  <button className={styles.cancelarButton}>Cancelar</button>
               </div>
            </div>
         </main>
         {/* Modal para selecionar pacientes */}
         {showModal && (
            <div className={styles.modal}>
               <div className={styles.modalContent}>
                  <h2>Selecione os pacientes</h2>
                  <ul className={styles.pacientesLista}>
                     {pacientes.map((paciente) => (
                        <li key={paciente.id}>
                           <Image
                              src={paciente.foto}
                              alt={paciente.nome}
                              width={50}
                              height={50}
                           />
                           <span>{paciente.nome}</span>
                           <input
                              type="checkbox"
                              checked={pacientesSelecionados.includes(
                                 paciente.id
                              )}
                              onChange={() =>
                                 togglePacienteSelecionado(paciente.id)
                              }
                           />
                        </li>
                     ))}
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
                        onClick={() => setShowModal(false)} // Fecha a modal
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
