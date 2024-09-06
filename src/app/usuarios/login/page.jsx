import Image from "next/image";
import styles from "./page.module.css";

export default function Login() {
   return (
      <div className={styles.LoginContainer}>
         {/* <div className={styles.LoginContent}> */}


         <div className={styles.LoginAcess}>
            <div className={styles.LoginForm}>

            <button type="submit" className={styles.ButtonCadastro}>
                      CRIAR CONTA
                  </button>

              <div className={styles.Titulo}>
                <label htmlFor="nomeProjeto">GARDEN</label>
                 <label htmlFor="Acesse" className={styles.AcesseSuaConta}>
                  Acesse sua conta:
                </label>
               </div>   


               <form>
                <div className={styles.FormGroup}>
                     <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Usuário"
                        className={styles.InputField}
                     />
                     <Image
                         src="/Icones/Usuario.svg"
                         width={25}
                         height={25}
                         alt="Icone Usuário"
                         className={styles.Icons}
                        />
                  </div>
                  
                  <div className={styles.FormGroup}>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Senha"
                        className={styles.InputField}
                     />
                       <Image
                         src="/Icones/OcultaSenha.svg"
                         width={25}
                         height={25}
                         alt="Icone Senha"
                         className={styles.Icons}
                        />
                  </div>

                  <label htmlFor="Esqueceu sua senha?" className={styles.EsqueceuSuaSenha}>Esqueceu sua senha?</label>

                  <button type="submit" className={styles.SubmitButton}>
                     ENTRAR
                  </button>
                  </form>
             </div>
         </div>

         <div className={styles.containerButton}></div>

         <div>
            <Image
               src="/images/ImageLogin.png"
               width={2880}
               height={2048}
               alt="Imagem"
               className={styles.BackgroundImageLogin}
            />
         </div>
      </div>
   );
}
