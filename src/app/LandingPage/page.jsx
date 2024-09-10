import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
   return (
      <div className={styles.container}>
         <div className={styles.BackgroundHeader}>
            <Image
               className={styles.logo}
               src="/images/LogoGarden.png"
               width={200}
               height={100}
               alt="Picture of the author"
            />
            <div className={styles.header}>
               <div className={styles.topBar}>
                  <nav className={styles.nav}>
                     <a href="#paciente">PACIENTE</a>
                     <a href="#seguranca">SEGURANÇA</a>
                     <a href="#psicologo">PSICÓLOGO</a>
                     <a href="#login">LOGIN</a>
                  </nav>
               </div>
            </div>
         </div>

         <div className={styles.hero}>
            <p>Texto introdutório aqui.</p>
            <button className={styles.saibaMais}>Saiba Mais</button>
         </div>

         <section id="paciente" className={styles.pacienteSection}>
            <div className={styles.pacienteIntro}>
               <p>Informações sobre o paciente.</p>
            </div>
            <div className={styles.pacienteCards}>
               <div className={styles.card}>
                  <Image
                     src="/image1.png"
                     alt="Imagem 1"
                     width={150}
                     height={150}
                  />
                  <p>Descrição 1</p>
               </div>
               <div className={styles.card}>
                  <Image
                     src="/image2.png"
                     alt="Imagem 2"
                     width={150}
                     height={150}
                  />
                  <p>Descrição 2</p>
               </div>
               <div className={styles.card}>
                  <Image
                     src="/image3.png"
                     alt="Imagem 3"
                     width={150}
                     height={150}
                  />
                  <p>Descrição 3</p>
               </div>
            </div>
         </section>

         <section id="seguranca" className={styles.segurancaSection}>
            <div className={styles.segurancaContent}>
               <div className={styles.segurancaImage}></div>
               <div className={styles.textContent}>
                  <h2>Expresse sem medo</h2>
                  <p>Texto explicativo sobre segurança.</p>
               </div>
            </div>
         </section>

         <section className={styles.divWithGradient}>
            <p>Texto dentro da div com gradiente.</p>
         </section>

         <section id="psicologo" className={styles.psicologoSection}>
            <div className={styles.psicologoLeft}>
               <div className={styles.featureCard}>
                  <i className="icon-example"></i>
                  <p>Feature 1</p>
               </div>
               <div className={styles.featureCard}>
                  <i className="icon-example"></i>
                  <p>Feature 2</p>
               </div>
               <div className={styles.featureCard}>
                  <i className="icon-example"></i>
                  <p>Feature 3</p>
               </div>
            </div>
            <div className={styles.psicologoRight}>
               <h2>Título</h2>
               <h3>Subtítulo</h3>
               <p>Texto explicativo.</p>
            </div>
         </section>

         <section className={styles.divWithGradient}>
            <p>Texto dentro da div com gradiente.</p>
         </section>

         <footer className={styles.footer}>
            <p>© 2024 Garden. Todos os direitos reservados.</p>
            <nav>
               <a href="#paciente">Paciente</a>
               <a href="#seguranca">Segurança</a>
               <a href="#psicologo">Psicólogo</a>
               <a href="#login">Login</a>
            </nav>
         </footer>
      </div>
   );
}
