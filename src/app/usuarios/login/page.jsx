import Image from "next/image";
import styles from "./page.module.css";

export default function Login() {
   return (
     <div className={styles.LoginContainer}>
         <div className={styles.LoginContent}>
            <div className={styles.LoginForm}>
            <label htmlFor="nomeProjeto">Garden</label>
            <label htmlFor="Acesse">Acesse sua conta</label>
         
               
               <form>
                  <div className={styles.FormGroup}>
                     <label htmlFor="username">Nome de usuário</label>
                     <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Digite seu nome de usuário" 
                        className={styles.InputField}
                     />
                  </div>
                  
                  <div className={styles.FormGroup}>
                     <label htmlFor="password">Senha</label>
                     <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Digite sua senha" 
                        className={styles.InputField}
                     />
                  </div>
                  
                  <button type="submit" className={styles.SubmitButton}>
                     Entrar
                  </button>
               </form>
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
      </div>
   );
}
