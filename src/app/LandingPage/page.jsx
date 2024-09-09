import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
   return (
      <div className={styles.container}>
         <div className={styles.BackgroundHeader}>
            <div className={styles.header}>
               <div className={styles.topBar}>
                  <div className={styles.logo}>GARDEN</div>
                  <nav className={styles.nav}>
                     <a href="#paciente">Paciente</a>
                     <a href="#seguranca">Segurança</a>
                     <a href="#psicologo">Psicólogo</a>
                     <a href="#login">Login</a>
                  </nav>
               </div>
               <div className={styles.hero}>
                  <p>Texto introdutório aqui.</p>
                  <button className={styles.saibaMais}>Saiba Mais</button>
               </div>

               {/* <Image
                  src="/public/images/BackgroundHeader.jpg"
                  width={1440}
                  height={2207}
                  alt="Tela de fundo"
                  className={styles.BackgroundHeader}
               /> */}
            </div>
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
               <div className={styles.segurancaImage}>
                  <Image
                     src="/background-image.png"
                     alt="Background"
                     layout="fill"
                     objectFit="cover"
                  />
               </div>
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
