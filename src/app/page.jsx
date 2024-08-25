import Head from "next/head";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
   return (
      <div className={styles.containerGlobal}>
         <Head>
            <title>Área de Trabalho - Psicólogo</title>
         </Head>
         <div className={styles.container}>
            <header className={styles.header}>
               <div className={styles.headercontainer}>
                  <nav>
                     <ul>
                        <li>
                           <div className={styles.notifications}>🔔</div>
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
               <div className={styles.patient}>
                  <label htmlFor="patientSelect">Pacientes:</label>

                  <select id="pac_id" className={styles.selectBox}>
                     <option value="patient1">Paciente 1</option>
                     <option value="patient2">Paciente 2</option>
                  </select>
               </div>

               <div className={styles.searchBar}>
                  <input type="text" placeholder="Pesquisar..." />
               </div>
            </section>

            {/* barra lateral */}

            <aside className={styles.sidebar}>
               <div className={styles.logo}>Garden Logo</div>

               <ul>
                  <li>
                     <Image
                        src="/icones/Note.png"
                        alt="tiktok"
                        width={20}
                        height={20}
                        className={styles.icone}
                     />
                     <p>Anotações</p>
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
               <h2>Área de Trabalho</h2>
               <p>Aqui as ações do psicólogo serão exibidas.</p>
            </main>
         </div>
      </div>
   );
}
