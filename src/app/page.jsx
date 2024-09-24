"use client";

import Head from "next/head";
import styles from "./page.module.css";

import { useState } from "react";
import Image from "next/image";

import PacienteButton from "../componentes/pacienteButton";
import PsicologoAnotacao from "../componentes/psicologoAnotacao";

import PacienteDiario from "../componentes/pacienteDiario";
import PacienteExercicios from "../componentes/pacienteExericios";

import LembreteSessao from "../componentes/lembreteSessao";
import Dashboard from "../componentes/dashboard";

import Notifications from "../componentes/notificacao";
import { PacienteProvider } from "../componentes/pacienteContext";
// import { Feather } from "react-icons/fa";

export default function Home() {
   const [Tela, setTela] = useState(0);

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
                        <li>
                           <div className={styles.notifications}>
                              <Notifications />
                           </div>
                        </li>
                        <li>
                           <span className={styles.profileName}>Dr. Silva</span>
                        </li>
                        <li>
                           <img
                              src="https://photos.psychologytoday.com/467daa31-46cd-11ea-a6ad-06142c356176/3/320x400.jpeg"
                              alt="Profile"
                              className={styles.profileImage}
                           />
                        </li>
                     </ul>
                  </nav>
               </div>
            </header>

            {/* Pesquisa de paciente */}

            <section className={styles.patientSelect}>
               <PacienteProvider>
                  <Component {...pageProps} />
               </PacienteProvider>
               <PacienteButton />
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
                  <PsicologoAnotacao />
               ) : Tela === 2 ? (
                  <PacienteDiario />
               ) : Tela === 3 ? (
                  <PacienteExercicios />
               ) : Tela === 4 ? (
                  <LembreteSessao />
               ) : Tela === 5 ? (
                  <Dashboard />
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
