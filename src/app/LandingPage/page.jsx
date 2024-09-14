import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
   return (
      <div className={styles.container}>
         <div className={styles.BackgroundHeader}>
         <div className={styles.header}>
         <div className={styles.topBar}>
            <Image
               className={styles.logo}
               src="/images/LogoWhite.png"
               width={700}
               height={300}
               alt="Picture of the author"
            />
                  <nav className={styles.nav}>
                     <ul>
                     <li><a href="#paciente">PACIENTE</a></li>
                     <li><a href="#seguranca">SEGURANÇA</a></li>
                     <li><a href="#psicologo">PSICÓLOGO</a></li>
                     <li><a href="#login">LOGIN</a></li>
                     </ul>                   
                  </nav>
               </div>
            </div>
        

         <div className={styles.hero}>
            <p> Seu bem estar está em suas mãos e o Garden está aqui para te ajudar</p>
            <button className={styles.saibaMais}>Saiba Mais</button>
         </div>
         </div>


{/* Seção paciente */}
         <section id="paciente" className={styles.pacienteSection}>
         <div className={styles.BackgroundPaciente}>
                  <Image 
                     src="/images/BackgroundPaciente.png"       //Imagem de fundo parte PACIENTE
                     alt="Escada das emoções"
                     width={743}
                     height={2389}
                  />
            </div>

            <div className={styles.pacienteIntro}>
             <p>No aplicativo Garden, você tem a oportunidade excepcional de elevar seu autoconhecimento a níveis inimagináveis, embarcando em uma jornada única de exploração dos seus pensamentos, emoções e convicções mais profundas. Através de uma colaboração verdadeira, 
               ajudamos você a acessar suas crenças mais arraigadas e a trabalhar de forma consciente para impulsionar sua evolução pessoal, espiritual e profissional.
             </p>
           </div>
           
            <div className={styles.pacienteCards}>
               <div className={styles.card}>
                  {/* <Image
                     src="/image1.png"
                     alt="Imagem 1"
                     width={150}
                     height={150}
                  /> */}
                  <p>Descrição 1</p>
               </div>
               <div className={styles.card}>
                  {/* <Image
                     src="/image2.png"
                     alt="Imagem 2"
                     width={150}
                     height={150}
                  /> */}
                  <p>Descrição 2</p>
               </div>
               <div className={styles.card}>
                  {/* <Image
                     src="/image3.png"
                     alt="Imagem 3"
                     width={150}
                     height={150}
                  /> */}
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
