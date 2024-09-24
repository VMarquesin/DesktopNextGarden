"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";

import Image from "next/image";
import PacientePerfil from "../perfilPaciente";

import api from "../../../services/api";
import GraficoEmocoes from "../../componentes/dashboard";

export default function PacienteButton() {
   const [nomePaciente, setNomePaciente] = useState("Paciente"); // Nome do paciente atualmente selecionado
   const [pacienteSelecionado, setPacienteSelecionado] = useState(null); // Paciente atualmente selecionado
   const [showPerfil, setShowPerfil] = useState(false); // Exibição do perfil do paciente
   const [pacientes, setPacientes] = useState([]); // Lista de pacientes
   const [usuarios, setUsuarios] = useState([]); // Lista de usuários

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

   // Função para selecionar o paciente e exibir o nome baseado na relação com o usuário
   function selecionarPaciente(paciente) {
      // Encontrando o usuário associado ao paciente
      const usuarioRelacionado = usuarios.find(
         (user) => user.usu_id === paciente.usu_id
      );

      // Se o usuário for encontrado, define o nome do paciente baseado no usuário
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
                     {/* Exibindo o nome do usuário associado ao paciente */}
                     {usuarios.find((user) => user.usu_id === paciente.usu_id)
                        ?.usu_nome || "Paciente"}
                  </p>
               ))}
            </div>
         </div>

         {showPerfil && pacienteSelecionado && (
            <main>
               <PacientePerfil
                  paciente={pacienteSelecionado} // Passa o paciente selecionado para o componente de perfil
               />
            </main>
         )}
         {/* {pacienteSelecionado && (
            <GraficoEmocoes pac_id={setPacienteSelecionado.pac_id} />
         )} */}
      </div>
   );
}
