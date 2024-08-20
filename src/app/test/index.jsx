import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <>
         <Head>
            <title>Garden - Psicologia Moderna</title>
            <meta
               name="description"
               content="Garden - Sistema para psicólogos auxiliarem no tratamento de seus pacientes."
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <header style={headerStyle}>
               <h1 style={titleStyle}>Bem-vindo ao Garden</h1>
               <p style={subtitleStyle}>
                  A solução para gestão moderna em psicologia
               </p>
               <Link href="/signup">
                  <a style={ctaButtonStyle}>Comece Agora</a>
               </Link>
            </header>
            <section style={sectionStyle}>
               <h2>Como Funciona</h2>
               <p>
                  Garden auxilia psicólogos no gerenciamento de seus pacientes
                  com facilidade e segurança.
               </p>
               <Image
                  src="/images/psychologist.jpg"
                  alt="Psicólogo em atendimento"
                  width={500}
                  height={300}
               />
            </section>
            <footer style={footerStyle}>
               <p>
                  &copy; {new Date().getFullYear()} Garden. Todos os direitos
                  reservados.
               </p>
            </footer>
         </main>
      </>
   );
}

const headerStyle = {
   backgroundColor: "#4CAF50",
   padding: "50px 0",
   textAlign: "center",
   color: "white",
};

const titleStyle = {
   fontSize: "2.5rem",
   marginBottom: "10px",
};

const subtitleStyle = {
   fontSize: "1.5rem",
   marginBottom: "20px",
};

const ctaButtonStyle = {
   backgroundColor: "#FFF",
   color: "#4CAF50",
   padding: "10px 20px",
   textDecoration: "none",
   borderRadius: "5px",
   fontSize: "1.2rem",
};

const sectionStyle = {
   padding: "20px",
   textAlign: "center",
};

const footerStyle = {
   backgroundColor: "#333",
   color: "white",
   textAlign: "center",
   padding: "10px 0",
};
