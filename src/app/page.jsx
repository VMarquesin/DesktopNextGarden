import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
   return (
      <div className="containerGlobal">
         <div className={styles.containerImagem}>
            <Image
               src="/background-wood-home.jpg"
               width={500}
               height={500}
               alt="Imagem"
               className={styles.imagemHomePage}
            />

            {/* <Image
               src="/download.jfif"
               width={50}
               height={50}
               alt="Imagem"
               className={styles.imagemHomePage}
            /> */}
         </div>
      </div>
   );
}
