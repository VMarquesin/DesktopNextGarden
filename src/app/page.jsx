"use client";

import Head from "next/head";
import styles from "./page.module.css";

import Image from "next/image";
import PacienteButton from "../componentes/pacienteButton";

import PsicologoAnotacao from "../componentes/psicologoAnotacao";
import PacienteDiario from "../componentes/pacienteDiario";

import PacienteExercicios from "../componentes/pacienteExericios";

import { useState } from "react";

export default function Home() {
   const [Tela, setTela] = useState(0);

   //  const [modalAberto, setModalAberto] = useState(false);

   //  const abrirModal = () => setModalAberto(true);
   //  const fecharModal = () => setModalAberto(false);

   return (
      <div className={styles.containerGlobal}>
         <Head>
            <title>Área de Trabalho - Psicólogo</title>
         </Head>
         <div className={styles.container}>
            <header className={styles.header}>
               <div className={styles.headercontainer}>
                  <div className={styles.logo}>Garden Logo</div>
                  <nav>
                     <ul>
                        <li>
                           <div className={styles.notifications}>
                              <Image
                                 src="/icones/Notificacao.png"
                                 alt="sino de notificação"
                                 width={20}
                                 height={20}
                                 className={styles.icone}
                              />
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

            <section className={styles.patientSelect}>
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
                     >
                        <Image
                           src="/icones/Note.png"
                           alt="Note"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Anotações</p>
                     </button>
                  </li>
                  <li>
                     <button data-target="#diario" onClick={() => setTela(2)}>
                        <Image
                           src="/icones/diario.png"
                           alt="Diario"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Diário</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#Exercícios"
                        onClick={() => setTela(3)}
                     >
                        <Image
                           src="/icones/exercicios.png"
                           alt="Exercícios"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Exercícios</p>
                     </button>

                     {/* opção abrir modal */}
                     {/* <button
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
                     )} */}
                  </li>
                  <li>
                     <Image
                        src="/icones/lembrete.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <button
                        data-target="#exercicios"
                        onClick={() => setTela(2)}
                     >
                        <p>Lembrete</p>
                     </button>
                  </li>
                  <li>
                     <Image
                        src="/icones/dashboard.png"
                        alt="Dashboard"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <button
                        data-target="#dashboard"
                        onClick={() => setTela(2)}
                     >
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
               ) : // : Tela === 4 ? < />
               // : Tela === 5 ? < />
               null}
            </main>
         </div>
      </div>
   );
}
