"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

import Image from "next/image";
import PacientePerfil from "../perfilPaciente";

import api from "../../../services/api";
import { usePaciente } from "../pacienteContext";

export default function PacienteButton() {
   const [nomePaciente, setNomePaciente] = useState("Paciente");
   const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
   // const {setPacienteSelecionadoContext} = useState([]); 
   const [showPerfil, setShowPerfil] = useState(false); 
   const [pacientes, setPacientes] = useState([]); 
   const [usuarios, setUsuarios] = useState([]); 

   // Buscando pacientes e usuários na API
   useEffect(() => {
      async function fetchPacientes() {
         try {
            const response = await api.get("/pacientes");
            setPacientes(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
         }
      }

      async function fetchUsuarios() {
         try {
            const response = await api.get("/usuarios");
            setUsuarios(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar usuários:", error);
         }
      }

      fetchPacientes();
      fetchUsuarios();
   }, []);

   // const selecionarPaciente = (paciente) => {
   //    setPacienteSelecionado(paciente);
   // };

   // Função para selecionar o paciente e exibir o nome baseado na relação com o usuário
   function selecionarPaciente(paciente) {
    
      const usuarioRelacionado = usuarios.find(
         (user) => user.usu_id === paciente.usu_id
      );

      if (usuarioRelacionado) {
         setNomePaciente(usuarioRelacionado.usu_nome);
      } else {
         setNomePaciente("Paciente");
      }

      setPacienteSelecionado(paciente);
      setShowPerfil(true);
   }

   return (
      <div>
         <div className={styles.pacienteContainer}>
            <button
               id="pacienteButton"
               className={styles.botaoPaciente}
               onClick={() => setShowPerfil(!showPerfil)} 
            >
               {nomePaciente}
            </button>
            <input
               type="checkbox"
               id="togglePacientes"
               className={styles.checkboxPaciente}
            />
            <label htmlFor="togglePacientes" className={styles.labelCheckbox}>
               <Image
                  src="/icones/arrow.svg"
                  alt="arrowDropDown"
                  width={20}
                  height={20}
                  className={styles.icone}
               />
            </label>

            <div id="listaPacientes" className={styles.listaPacientes}>
               {pacientes.map((paciente) => (
                  <p
                     key={paciente.pac_id}
                     className={styles.pacienteItem}
                     onClick={() => selecionarPaciente(paciente)} 
                  >
      
                     {usuarios.find((user) => user.usu_id === paciente.usu_id)
                        ?.usu_nome || "Paciente"}
                  </p>
               ))}
            </div>
         </div>

         {showPerfil && pacienteSelecionado && (
            <main>
               <PacientePerfil
                  paciente={pacienteSelecionado} 
               />
            </main>
         )}
      </div>
   );
}
