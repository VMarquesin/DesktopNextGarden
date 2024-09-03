import styles from "./page.module.css";
import Image from "next/image";

export default function Page() {
   return (
      <div className={styles.global}>
         <header className={styles.containerInicio}>oi</header>

         {/* seção de funcionalidades do app */}

         <section className={styles.containerPaciente}> </section>
         {/* Saiba mais */}
         <section className={styles.containerSaibamais}></section>
         {/* primeiro conteúdo */}
         <section className={styles.containerComplemento}></section>
         {/* seção de funcionalidades psicologo */}
         <section className={styles.containerPsicologo}></section>
         {/* segundo conteúdo */}
         <section className={styles.containerSegundoComplemento}></section>
         {/* ródape */}
         <footer className={styles.containerRodape}></footer>
      </div>
   );
}
