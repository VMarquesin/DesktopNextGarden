"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

import Image from "next/image";
import PacientePerfil from "../perfilPaciente";

import api from "../../../services/api";
import axios from "axios";

export default function PacienteButton() {
   const [nomePaciente, setNomePaciente] = useState("Paciente"); // paciente atualmente selecionado
   const [pacienteSelecionado, setPacienteSelecionado] = useState(null); //paciente atualmente selecionado
   const [showPerfil, setShowPerfil] = useState(false); //exibição do perfil do paciente
   const [pacientes, setPacientes] = useState([]);

   useEffect(() => {
      async function fetchPacientes() {
         try {
            const response = await api.get("/pacientes");
            // setPacientes(response.data);
            setPacientes(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
         }
      }

      fetchPacientes();
   }, []);

   function selecionarPaciente(paciente) {
      setNomePaciente(paciente.pac_id);
      setPacienteSelecionado(paciente);
      setShowPerfil(true);
   };

   // const handleSaveNote = async (nota) => {
   //    try {
   //       await api.post("/psi_anotacao", {
   //          pacienteId: pacienteSelecionado.pac_id,
   //          conteudo: pan_anotacao,
   //       });
   //       console.log(
   //          `Nota salva para ${pacienteSelecionado.pac_id}: ${pan_anotacao}`
   //       );
   //    } catch (error) {
   //       console.error("Erro ao salvar nota:", error);
   //    }
   // };


   // const pacientes = [
   //    {
   //       nome: "Paciente 1",
   //       nickname: "P1",
   //       telefone: "123456789",
   //       dataNascimento: "01/01/1980",
   //       cpf: "000.000.000-00",
   //       filhos: "2",
   //       escolaridade: "Ensino Médio",
   //       trabalho: "Desenvolvedor",
   //       estadoCivil: "Casado",
   //       status: "Ativo",
   //       foto: "/path/to/foto1.jpg",
   //    },
   //    {
   //       nome: "Paciente 2",
   //       nickname: "P2",
   //       telefone: "987654321",
   //       dataNascimento: "02/02/1990",
   //       cpf: "111.111.111-11",
   //       filhos: "1",
   //       escolaridade: "Ensino Superior",
   //       trabalho: "Designer",
   //       estadoCivil: "Solteiro",
   //       status: "Inativo",
   //       foto: "/path/to/foto2.jpg",
   //    },
   //    {
   //       nome: "Paciente 3",
   //       nickname: "P3",
   //       telefone: "555555555",
   //       dataNascimento: "03/03/1985",
   //       cpf: "222.222.222-22",
   //       filhos: "3",
   //       escolaridade: "Mestrado",
   //       trabalho: "Professor",
   //       estadoCivil: "Divorciado",
   //       status: "Ativo",
   //       foto: "/path/to/foto3.jpg",
   //    },
   // ];
   // function selecionarPaciente(paciente) {
   //    setNomePaciente(paciente.pac_id); // Atualiza o nome exibido no botão
   //    setPacienteSelecionado(paciente); // Define o paciente selecionado
   //    setShowPerfil(true); // Exibe o perfil do paciente
   // }

   return (
      <div>
         <div className={styles.pacienteContainer}>
            <button
               id="pacienteButton"
               className={styles.botaoPaciente}
               onClick={() => setShowPerfil(!showPerfil)} // Mostrar e esconder o perfil
            >
               {nomePaciente} {/* Nome do paciente exibido no botão */}
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
                     onClick={() => selecionarPaciente(paciente)} // Seleção do paciente
                  >
                     {paciente.nome}
                  </p>
               ))}
            </div>
         </div>

         {showPerfil && pacienteSelecionado && (
            <main>
               <PacientePerfil
                  paciente={pacienteSelecionado} // Passa o paciente selecionado para o componente de perfil
                  // onSaveNote={handleSaveNote}
               />
            </main>
         )}
      </div>
   );
}
