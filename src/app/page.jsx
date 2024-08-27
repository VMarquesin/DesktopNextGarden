"use client";

import Head from "next/head";
import styles from "./page.module.css";

import Image from "next/image";
import PacienteButton from "../componentes/pacienteButton";

import PsicologoAnotacao from "../componentes/psicologoAnotacao";
import { useState } from "react";

export default function Home() {
   const [Tela, setTela] = useState(0);

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
                        {/* <Image
                           src="/icones/Note.png"
                           alt="tiktok"
                           width={20}
                           height={20}
                           className={styles.icone}
                        /> */}
                        Anotações
                     </button>
                     <Image
                        src="/icones/Note.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                  </li>
                  <li>
                     <Image
                        src="/icones/favoritos.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <p>Favoritos</p>
                  </li>
                  <li>
                     <Image
                        src="/icones/diario.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <p>Diário</p>
                  </li>
                  <li>
                     <Image
                        src="/icones/chat.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <p>Chat</p>
                  </li>
                  <li>
                     <Image
                        src="/icones/exercicios.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <p>Exercícios</p>
                  </li>
                  <li>
                     <Image
                        src="/icones/lembrete.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <p>Lembrete</p>
                  </li>
                  <li>
                     <Image
                        src="/icones/dashboard.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <p>Dashboard</p>
                  </li>
               </ul>
            </aside>

            <main className={styles.mainContent}>
               {Tela == 1 ? <PsicologoAnotacao /> : null}
            </main>
         </div>
      </div>
   );
}
