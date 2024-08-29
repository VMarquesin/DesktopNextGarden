import Image from "next/image";
import styles from "./page.module.css";

export default function Login() {
   return (
      <div className={styles.LoginContainer}>
         {/* <div className={styles.LoginContent}> */}


         <div className={styles.LoginAcess}>
            <div className={styles.LoginForm}>

            <button type="submit" className={styles.ButtonCadastro}>
                      Cadastrar-se
                  </button>

              <div className={styles.Titulo}>
                <label htmlFor="nomeProjeto">GARDEN</label>
                 <label htmlFor="Acesse" className={styles.AcesseSuaConta}>
                  Acesse sua conta:
                </label>
               </div>   

               <form>
                  <div className={styles.FormGroup}>
                     <label htmlFor="username">Usuário:</label>
                     <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Digite seu nome de usuário"
                        className={styles.InputField}
                     />
                       <Image
                         src="/Icones/Usuario.svg"
                         width={20}
                         height={20}
                         alt="Icone Usuário"
                         className={styles.Icons}
                        />
                  </div>

                  <div className={styles.FormGroup}>
                     <label htmlFor="password">Senha:</label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        className={styles.InputField}
                     />
                     <Image
                         src="/Icones/OcultaSenha.svg"
                         width={20}
                         height={20}
                         alt="Icone Senha"
                         className={styles.Icons}
                        />
                  </div>

                  <label htmlFor="Esqueceu sua senha?" className={styles.EsqueceuSuaSenha}>Esqueceu sua senha?</label>

                  <button type="submit" className={styles.SubmitButton}>
                     Entrar
                  </button>
               </form>
            </div>
         </div>

         <div className={styles.containerButton}></div>

         <div>
            <Image
               src="/ImageLogin.png"
               width={500}
               height={500}
               alt="Imagem"
               className={styles.BackgroundImageLogin}
            />
         </div>
         {/* </div> */}
      </div>
   );
}
