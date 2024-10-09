"use client";

import Head from "next/head";
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import Image from "next/image";

import PacienteButton from "../componentes/pacienteButton";
import PsicologoAnotacao from "../componentes/psicologoAnotacao";

import PacienteDiario from "../componentes/pacienteDiario";
import PacienteExercicios from "../componentes/pacienteExericios";

import LembreteSessao from "../componentes/lembreteSessao";
import Dashboard from "../componentes/dashboard";

import api from "../../services/api";

import Notifications from "../componentes/notificacao";
// import { PacienteProvider } from "../componentes/pacienteContext";
// import { Feather } from "react-icons/fa";

export default function Home() {
   const [Tela, setTela] = useState(0);
   const [pacienteSel, setPacienteSel] = useState(0);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [psicologoInfo, setPsicologoInfo] = useState(null);
   const [editMode, setEditMode] = useState(false);

   const fetchPsicologoInfo = async () => {
      try {
         const usu_id = 10;
         const psi_id = 1;
         const usuarioResponse = await api.get(`/usuarios/${usu_id}`);
         const psicologoResponse = await api.get(`/psicologo/${psi_id}`);

         setPsicologoInfo({
            ...usuarioResponse.data.dados[0],
            ...psicologoResponse.data.dados[0],
         });
      } catch (error) {
         console.error("Erro ao buscar informações do psicólogo:", error);
      }
   };

   const handleProfileClick = () => {
      setIsProfileOpen(!isProfileOpen);
      if (!psicologoInfo) {
         fetchPsicologoInfo();
      }
   };
   // console.log=handleProfileClick, "error"

   const handleSaveChanges = async () => {
      try {
         await api.patch(`/psicologo/${psicologoInfo.psi_id}`, {
            usu_nome: psicologoInfo.usu_nome,
            usu_nick: psicologoInfo.usu_nick,
            usu_email: psicologoInfo.usu_email,
            psi_endereco: psicologoInfo.psi_endereco,
            psi_cnpj: psicologoInfo.psi_cnpj,
         });
         setEditMode(false);
      } catch (error) {
         console.error("Erro ao salvar alterações:", error);
      }
   };

   function carregaPaciente(id) {
      setPacienteSel(id);
   }
   console.log(pacienteSel, "test");

   return (
      <div className={styles.containerGlobal}>
         <Head>
            <title>Área de Trabalho - Psicólogo</title>
         </Head>
         <div className={styles.container}>
            {/* Topbar */}

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
                  </div>
                  <nav>
                     <ul>
                        {/* <li>
                           <div className={styles.notifications}>
                              <Notifications />
                           </div>
                        </li> */}
                        <li>
                           <span className={styles.profileName}>Dr. Silva</span>
                        </li>
                        <li>
                           <img
                              src="https://photos.psychologytoday.com/467daa31-46cd-11ea-a6ad-06142c356176/3/320x400.jpeg"
                              alt="Profile"
                              className={styles.profileImage}
                              onClick={handleProfileClick}
                           />
                           {/* {console.log={handleProfileClick}} */}
                        </li>
                     </ul>
                  </nav>
               </div>
            </header>
            {isProfileOpen && psicologoInfo && (
               <div className={styles.profileDropdown}>
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
                        </button>
                     </>
                  )}
               </div>
            )}
            {/* Pesquisa de paciente */}

            <section className={styles.patientSelect}>
               <PacienteButton carregaPaciente={carregaPaciente} />
               <div className={styles.searchBar}>
                  <input type="text" placeholder="Pesquisar paciente..." />
               </div>
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
                        data-target="#lembrete"
                        onClick={() => setTela(4)}
                        className={Tela === 4 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/lembrete.svg"
                           alt="tiktok"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />

                        <p>Lembrete</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#dashboard"
                        onClick={() => setTela(5)}
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
               </ul>
            </aside>

            <main className={styles.mainContent}>
               {Tela === 1 ? (
                  <PsicologoAnotacao pacienteId={pacienteSel} />
               ) : Tela === 2 ? (
                  <PacienteDiario pacienteId={pacienteSel} />
               ) : Tela === 3 ? (
                  <PacienteExercicios pacienteId={pacienteSel} />
               ) : Tela === 4 ? (
                  <LembreteSessao pacienteId={pacienteSel} />
               ) : Tela === 5 ? (
                  <Dashboard pacienteId={pacienteSel} />
               ) : null}
            </main>
         </div>
      </div>
   );
}

//  const [modalAberto, setModalAberto] = useState(false);

//  const abrirModal = () => setModalAberto(true);
//  const fecharModal = () => setModalAberto(false);

{
   /* opção abrir modal */
}
{
   /* <button
                        data-target="#exercicios"
                        onClick={abrirModal}
                     ></button>
                     {modalAberto && (
                        <div className={styles.modal}>
                           <div className={styles.modalContent}>
                              <span
                                 className={styles.closeButton}
                                 onClick={fecharModal}
                              >
                                 &times;
                              </span>

                              <h2>Conteudo</h2>
                              <p>conteudo modal</p>
                           </div>
                        </div>
                     )} */
}
