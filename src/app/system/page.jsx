"use client";

import Head from "next/head";
import styles from "./page.module.css";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Link from "next/link";
import PacienteButton from "../../componentes/pacienteButton";

import PsicologoAnotacao from "../../componentes/psicologoAnotacao";
import PacienteDiario from "../../componentes/pacienteDiario";

import PacienteExercicios from "../../componentes/pacienteExericios";
import Dashboard from "../../componentes/dashboard";

import api from "../../services/api";
import CadastroPaciente from "../../componentes/cadastroPaciente";

import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

export default function Home() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);
   const [Tela, setTela] = useState(0);
   const [pacienteSel, setPacienteSel] = useState(null);
   const [pacientes, setPacientes] = useState([]);

   // profile

   // const [isProfileOpen, setIsProfileOpen] = useState(false);
   // const [editMode, setEditMode] = useState(false);

   // barra de pesquisa

   // const [searchTerm, setSearchTerm] = useState("");
   // const [pacientesFiltrados, setPacientesFiltrados] = useState([]);

   const perfilRef = useRef();

   const { psicologoInfo, logout } = useContext(UserContext);

   useEffect(() => {
      get_pacientes(psicologoInfo?.psi_id);
   }, []);

   const get_pacientes = async (psi_id) => {
      const response = await api.get(`/paciente_psi_relacao/${psi_id}`);
      const dados = response.data.dados;

      setPacientes(dados);
   };

   // barra de pesquisa

   // useEffect(() => {
   //    if (searchTerm.length > 0) {
   //       // Chama a API para buscar pacientes
   //       const fetchPacientes = async () => {
   //          try {
   //             const response = await api.get(
   //                `/usuarios/pacientes?nome=${searchTerm}`
   //             );
   //             setPacientesFiltrados(response.data.dados); // Ajuste para o retorno da API
   //          } catch (error) {
   //             console.error("Erro ao buscar pacientes:", error);
   //          }
   //       };

   //       fetchPacientes();
   //    } else {
   //       setPacientesFiltrados([]); // Limpa a lista se não houver termo de busca
   //    }
   // }, [searchTerm]);

   // useEffect(() => {
   //    if (searchTerm.length > 0) {
   //       // Chama a API para buscar pacientes
   //       const fetchPacientes = async () => {
   //          try {
   //             const response = await api.get(
   //                `/usuarios/pacientes?nome=${searchTerm}`
   //             );
   //             setPacientesFiltrados(response.data.dados); // Ajuste para o retorno da API
   //          } catch (error) {
   //             console.error("Erro ao buscar pacientes:", error);
   //          }
   //       };

   //       fetchPacientes();
   //    } else {
   //       setPacientesFiltrados([]); // Limpa a lista se não houver termo de busca
   //    }
   // }, [searchTerm]);

   // Mostrar o perfil do psicologo

   // const handleProfileClick = () => {
   //    setIsProfileOpen(!isProfileOpen);
   //    if (!psicologoInfo) {
   //       fetchPsicologoInfo();
   //    }
   // };
   // const handleSaveChanges = async () => {
   //    try {
   //       await api.patch(`/psicologo/${psicologoInfo.psi_id}`, {
   //          usu_nome: psicologoInfo.usu_nome,
   //          usu_nick: psicologoInfo.usu_nick,
   //          usu_email: psicologoInfo.usu_email,
   //          psi_endereco: psicologoInfo.psi_endereco,
   //          psi_cnpj: psicologoInfo.psi_cnpj,
   //       });
   //       setEditMode(false);
   //    } catch (error) {
   //       console.error("Erro ao salvar alterações:", error);
   //    }
   // };

   return (
      // psicologoInfo ? (
      <div className={styles.containerGlobal}>
         <Head>
            <title>Área de Trabalho - Psicólogo</title>
         </Head>
         <div className={styles.container}>
            <header className={styles.header}>
               <div className={styles.headercontainer}>
                  <div className={styles.logo}>
                     <Image
                        src="/images/logoGarden.png"
                        alt="logo Garden"
                        width={140}
                        height={50}
                        // className={styles.icone}
                     />
                     <p></p>
                  </div>
                  <nav>
                     <ul>
                        <li>
                           <span className={styles.profileName}>
                              {psicologoInfo
                                 ? psicologoInfo.usu_nome
                                 : "Erro na busca"}
                           </span>
                        </li>
                        <li>
                           <img
                              src="../../images/profile.svg"
                              alt="Profile"
                              className={styles.profileImage}
                              // onClick={handleProfileClick}
                              ref={perfilRef}
                           />
                           {/* {console.log={handleProfileClick}} */}
                        </li>
                        <li>
                           <div>
                              <Link
                                 href={"/usuarios/login"}
                                 onClick={() => {
                                    logout();
                                 }}
                              >
                                 logout
                              </Link>
                           </div>
                        </li>
                     </ul>
                  </nav>
               </div>
            </header>

            {/* estrutura da visualização do perfil */}

            {/* {isProfileOpen && psicologoInfo && (
            <div ref={perfilRef} className={styles.profileDropdown}>
               {editMode ? (
                  <>
                     <input
                        type="text"
                        value={psicologoInfo.usu_nome}
                        onChange={(e) =>
                           setPsicologoInfo({
                              ...psicologoInfo,
                              usu_nome: e.target.value,
                           })
                        }
                     />
                     <input
                        type="text"
                        value={psicologoInfo.usu_nick}
                        onChange={(e) =>
                           setPsicologoInfo({
                              ...psicologoInfo,
                              usu_nick: e.target.value,
                           })
                        }
                     />
                     <input
                        type="email"
                        value={psicologoInfo.usu_email}
                        onChange={(e) =>
                           setPsicologoInfo({
                              ...psicologoInfo,
                              usu_email: e.target.value,
                           })
                        }
                     />
                     <input
                        type="text"
                        value={psicologoInfo.psi_endereco}
                        onChange={(e) =>
                           setPsicologoInfo({
                              ...psicologoInfo,
                              psi_endereco: e.target.value,
                           })
                        }
                     />
                     <input
                        type="text"
                        value={psicologoInfo.psi_cnpj}
                        onChange={(e) =>
                           setPsicologoInfo({
                              ...psicologoInfo,
                              psi_cnpj: e.target.value,
                           })
                        }
                     />
                     <button onClick={handleSaveChanges}>Salvar</button>
                     <button onClick={() => setEditMode(false)}>
                        Cancelar
                     </button>
                  </>
               ) : (
                  <>
                     <p>Nome: {psicologoInfo.usu_nome}</p>
                     <p>Nick: {psicologoInfo.usu_nick}</p>
                     <p>Email: {psicologoInfo.usu_email}</p>
                     <p>Endereço: {psicologoInfo.psi_endereco}</p>
                     <p>CNPJ: {psicologoInfo.psi_cnpj}</p>
                     <button onClick={() => setEditMode(true)}>
                        Editar
                     </button> */}

            {/* </> */}
            {/* )} */}

            {/* )} */}
            {/* Pesquisa de paciente */}

            <section className={styles.patientSelect}>
               <PacienteButton
                  pacienteSel={pacienteSel}
                  setPacienteSelecionado={setPacienteSel}
                  pacientes={pacientes}
               />

               {/* barra de pesquisa do paciente */}
               {/* <div className={styles.searchBar}>
                  <input
                     type="text"
                     placeholder="Pesquisar paciente..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {pacientesFiltrados.length > 0 && (
                     <ul className={styles.pacientesList}>
                        {pacientesFiltrados.map((paciente) => (
                           <li
                              key={paciente.usu_id}
                              onClick={() => carregaPaciente(paciente.usu_id)}
                           >
                              {paciente.usu_nome}
                           </li>
                        ))}
                     </ul>
                  )}
               </div> */}
            </section>

            {/* barra lateral */}

            <aside className={styles.sidebar}>
               <ul>
                  <li>
                     <button
                        data-target="#anotacoes"
                        onClick={() => setTela(1)}
                        className={Tela === 1 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/Note.svg"
                           alt="Note"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Anotações</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#diario"
                        onClick={() => setTela(2)}
                        className={Tela === 2 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/diario.svg"
                           alt="Diario"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <book-open />
                        <p>Diário</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#Exercícios"
                        onClick={() => setTela(3)}
                        className={Tela === 3 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/exercicios.svg"
                           alt="Exercícios"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Exercícios</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#dashboard"
                        onClick={() => setTela(4)}
                        className={Tela === 5 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/dashboard.svg"
                           alt="Dashboard"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Dashboard</p>
                     </button>
                  </li>
                  <li>
                     <button
                        onClick={openModal}
                        className={styles.cadastroButton}
                     >
                        <Image
                           src="/icones/NomeUsuarioWhite.svg"
                           alt="Dashboard"
                           width={20}
                           height={20}
                           className={styles.iconeCad}
                        />
                        <p>Novo Paciente</p>
                     </button>
                     {isModalOpen && <CadastroPaciente onClose={closeModal} />}
                  </li>
               </ul>
            </aside>

            <main className={styles.mainContent}>
               {Tela === 1 ? (
                  <PsicologoAnotacao paciente={pacienteSel} />
               ) : Tela === 2 ? (
                  <PacienteDiario pacienteId={pacienteSel?.pac_id} />
               ) : Tela === 3 ? (
                  <PacienteExercicios pacienteId={pacienteSel} />
               ) : Tela === 4 ? (
                  <Dashboard pacienteId={pacienteSel} />
               ) : null}
            </main>
         </div>
      </div>
      // ) : <p>Você não tem autorização</p>
   );
}
