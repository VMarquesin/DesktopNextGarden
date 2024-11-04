"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";

import Image from "next/image";
import PacientePerfil from "../perfilPaciente";

import api from "../../services/api";
// import { usePaciente } from "../pacienteContext";

export default function PacienteButton({ carregaPaciente }) {
   const [pacienteSelecionado, setPacienteSelecionado] = useState();
   const [nomePaciente, setNomePaciente] = useState("Paciente");
   const [showPerfil, setShowPerfil] = useState(false);
   const [pacientes, setPacientes] = useState([]);
   const [usuarios, setUsuarios] = useState([]);
   const perfilRef = useRef(false);
   const botaoRef = useRef();

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

   console.log("meus pacientes: ", pacientes);

   function selecionarPaciente(paciente) {
      const usuarioRelacionado = usuarios.find(
         (user) => user.usu_id === paciente.usu_id
      );
      // console.log(user.usu_id, "a", paciente.usu_id, "b");
      if (usuarioRelacionado) {
         setNomePaciente(usuarioRelacionado.usu_nome);
      } else {
         setNomePaciente("Paciente");
      }

      setPacienteSelecionado(paciente);
      setShowPerfil(true);
      carregaPaciente(paciente.pac_id);
   }
   console.log(selecionarPaciente);

   useEffect(() => {
      // Verifica se clicou fora de notificações
      const handleClickOutside = (event) => {
         if (perfilRef.current && !perfilRef.current.contains(event.target)) {
            setShowPerfil(false);
         }
      };

      // Ouvinte para cliques no documento

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   // useEffect(() => {
   //    // Verifica se clicou fora de notificações
   //    const handleClickOutside = (event) => {
   //       if (botaoRef.current && !botaoRef.current.contains(event.target)) {
   //          setPacienteSelecionado();
   //       }
   //    };

   //    // Ouvinte para cliques no documento

   //    document.addEventListener("mousedown", handleClickOutside);
   //    return () => {
   //       document.removeEventListener("mousedown", handleClickOutside);
   //    };
   // }, []);
   return (
      <div>
         {/* ref={botaoRef} */}
         <div  className={styles.pacienteContainer}>
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
            <main ref={perfilRef}>
               <PacientePerfil paciente={pacienteSelecionado} />
            </main>
         )}
      </div>
   );
}
