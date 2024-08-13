import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
   return (
      <div className="containerGlobal">
         <h1 className={styles.tituloHomePage}>Aula Next JS</h1>
         <h2>Exemplo h2</h2>
         <h3>Exemplo h3</h3>
         <p>Texto parágrafo</p>

         <div className={styles.containerImagem}>
            <Image
               src="/download.jfif"
               width={500}
               height={500}
               alt="Imagem"
               className={styles.imagemHomePage}
            />

            <Image
               src="/download.jfif"
               width={50}
               height={50}
               alt="Imagem"
               className={styles.imagemHomePage}
            />
         </div>
      </div>
   );
}
