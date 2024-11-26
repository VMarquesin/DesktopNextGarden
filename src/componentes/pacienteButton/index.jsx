"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./index.module.css";

import Image from "next/image";
import PacientePerfil from "../perfilPaciente";

import api from "../../services/api";
// import { usePaciente } from "../pacienteContext";

export default function PacienteButton({
   pacienteSel,
   setPacienteSelecionado,
   pacientes = [],
}) {
   //exibiçã odo perfil do paciente
   const [showPerfil, setShowPerfil] = useState(false);
   const perfilRef = useRef(false);

   //atualiza o estado pacentesel para paciente selecionado
   function selecionarPaciente(paciente) {
      setPacienteSelecionado(paciente);
      setShowPerfil(true);
      //exiber o perfil ao definir como verdadeiro
   }

   //detectar clique fora do perfilRef
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (perfilRef.current && !perfilRef.current.contains(event.target)) {
            setShowPerfil(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div>
         {/* ref={botaoRef} */}
         <div className={styles.pacienteContainer}>
            {/* mostra nome do paciente selecionado e abre o perfil quando clicar */}
            <button
               id="pacienteButton"
               className={styles.botaoPaciente}
               onClick={() => setShowPerfil(!showPerfil)}
            >
               {pacienteSel ? pacienteSel.usu_nome : "Paciente"}
            </button>

            {/* checkbox para alterna a exibição da lista de pac */}
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
            {/* carrega a lista dos paciente e onclick para seleção */}
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
         {/* puxar o componente perfil do paciente */}
         {showPerfil && pacienteSel && (
            <main ref={perfilRef}>
               <PacientePerfil paciente={pacienteSel} />
            </main>
         )}
      </div>
   );
}
