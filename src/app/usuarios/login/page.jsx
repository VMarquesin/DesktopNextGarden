import Image from "next/image";
import styles from "./page.module.css";

export default function Login() {
   return (
     <div className={styles.LoginContainer}>
         <div className={styles.LoginContainer}>
            <p>Garden</p>
            <p>Acesse sua conta:</p>
         </div>
         <div className={styles.BackgroundImageLogin}>
            <Image
               src="/ImageLogin.png"
               width={500}
               height={500}
               alt="Imagem"
               className={styles.BackgroundImageLogin}
            />
         </div>
      </div>
   );
}
