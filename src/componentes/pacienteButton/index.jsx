"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";

import Image from "next/image";
import PacientePerfil from "../perfilPaciente";

import api from "../../services/api";
// import { usePaciente } from "../pacienteContext";

export default function PacienteButton({ pacienteSel, setPacienteSelecionado, pacientes = [] }) {
   const [showPerfil, setShowPerfil] = useState(false);
  
   const perfilRef = useRef(false);

   function selecionarPaciente(paciente) {
      setPacienteSelecionado(paciente);
      setShowPerfil(true);
   }

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

   return (
      <div>
         {/* ref={botaoRef} */}
         <div  className={styles.pacienteContainer}>
            <button
               id="pacienteButton"
               className={styles.botaoPaciente}
               onClick={() => setShowPerfil(!showPerfil)}
            >
               {pacienteSel ? pacienteSel.usu_nome : "Paciente"}
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
                     {paciente.usu_nome}
                  </p>
               ))}
            </div>
         </div>

         {showPerfil && pacienteSel && (
            <main ref={perfilRef}>
               <PacientePerfil paciente={pacienteSel} />
            </main>
         )}
      </div>
   );
}
