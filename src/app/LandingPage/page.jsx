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
                        <li>
                           <a href="#paciente">PACIENTE</a>
                        </li>
                        <li>
                           <a href="#seguranca">SEGURANÇA</a>
                        </li>
                        <li>
                           <a href="#psicologo">PSICÓLOGO</a>
                        </li>
                        <li>
                           <a href="#login">LOGIN</a>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>

            <div className={styles.hero}>
               <p>
                  {" "}
                  Seu bem estar está em suas mãos e o Garden está aqui para te
                  ajudar
               </p>
               <button className={styles.saibaMais}>Saiba Mais</button>
            </div>
         </div>

         {/* Seção paciente */}
         <section id="paciente" className={styles.pacienteSection}>
            <div className={styles.BackgroundPaciente}>
               <div className={styles.pacienteIntro}>
                  <p>
                     No aplicativo Garden, você tem a oportunidade excepcional
                     de elevar seu autoconhecimento a níveis inimagináveis,
                     embarcando em uma jornada única de exploração dos seus
                     pensamentos, emoções e convicções mais profundas. Através
                     de uma colaboração verdadeira, ajudamos você a acessar suas
                     crenças mais arraigadas e a trabalhar de forma consciente
                     para impulsionar sua evolução pessoal, espiritual e
                     profissional.
                  </p>
               </div>

               {/* <Image
                  src="/images/BackgroundPaciente.png" //Imagem de fundo parte PACIENTE
                  alt="Escada das emoções"
                  width={743}
                  height={2389}
               /> */}

               <div className={styles.pacienteCards}>
                  <div className={styles.card}>
                     <Image
                        src="/images/diario.svg"
                        alt="Imagem 1"
                        width={450}
                        height={450}
                     />
                  </div>
                  <div className={styles.card}>
                     <Image
                        src="/images/emocao.svg"
                        alt="Imagem 2"
                        width={450}
                        height={450}
                     />
                  </div>
                  <div className={styles.card}>
                     <Image
                        src="/images/conhecimento.svg"
                        alt="Imagem 3"
                        width={450}
                        height={450}
                     />
                  </div>
               </div>
            </div>
         </section>

         <section id="seguranca">
            <div className={styles.segurancaContent}>
               <div className={styles.segurancaImage}>
                  <div className={styles.telemovel}>
                     <Image
                        src="/images/telemovel.svg"
                        alt="Imagem 3"
                        width={750}
                        height={750}
                     />
                  </div>
                  <div className={styles.textContent}>
                     <h2 className={styles.primeiro}>Expresse</h2>
                     <h2>sem medo</h2>
                     <p>
                        Com criptografia de ponta a ponta todas mensagens e
                        aúdios estão protegidos. Utilizamos tecnologias
                        avançadas de segurança para proteger seus dados
                        pessoais. Sua privacidade é nossa prioridade máxima, e
                        nunca compartilharemos suas informações sem sua
                        permissão. Fique tranquilo enquanto você se concentra em
                        sua jornada de bem-estar e autoconhecimento com nosso
                        aplicativo.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         <section className={styles.divGradient}>
            <p>
               Integrando o Garden em sua prática, você estará oferecendo uma
               ferramenta adicional de apoio aos seus pacientes, complementando
               seu trabalho terapêutico. Com recursos práticos e conteúdos
               complementares, o Garden é um recurso valioso para ajudar seus
               pacientes a alcançarem seus objetivos de saúde mental.
            </p>
         </section>

         <section id="psicologo">
            <div className={styles.contianerPsi}>
               <div className={styles.backgroundPsicologo}>
                  {/* <Image
                  src="/images/fundoPsi.svg"
                  alt="Imagem 3"
                  width={1440}
                  height={2242}
                  className={styles.backgroundPsicologo}
               /> */}

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
               </div>
            </div>
         </section>

         <section>
            <div className={styles.divGradient}>
               <p>
                  Estamos aqui para ser o solo fértil onde suas aspirações podem
                  florescer. Venha mergulhar nas maravilhas do seu jardim
                  interior.
               </p>
            </div>
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
