import Image from "next/image";
import styles from "./page.module.css";

export default function Cadastro() {
   return (
      <div className={styles.CadastroContainer}>
         {/* <div className={styles.LoginContent}> */}

         <div className={styles.CadastroAcess}>
            <div className={styles.CadastroForm}>
               <button type="submit" className={styles.ButtonRetornar}>
                  RETORNAR
               </button>

               <div className={styles.Titulo}>
                  <label htmlFor="nomeProjeto">GARDEN</label>
                  <label htmlFor="Acesse" className={styles.Retornar}>
                     Criar conta:
                  </label>
               </div>

               <form>
                  <div className={styles.FormGroup}>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome completo"
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/NomeUsuario.svg"
                        width={25}
                        height={25}
                        alt="Icone Nome Completo"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Nome de Usuário"
                        className={styles.InputField}
                     />
                     <Image
                        src="/Icones/perfil.png"
                        width={25}
                        height={25}
                        alt="Icone Usuário"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Digite seu Email"
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/email.svg"
                        width={25}
                        height={25}
                        alt="Icone Email"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua Senha"
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/OcultaSenha.svg"
                        width={25}
                        height={25}
                        alt="Icone Senha"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Confirme sua Senha"
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/OcultaSenha.svg"
                        width={25}
                        height={25}
                        alt="Icone Senha"
                        className={styles.Icons}
                     />
                  </div>

                  <button type="submit" className={styles.SubmitButton}>
                     CADASTRAR
                  </button>
               </form>
            </div>
         </div>

         <div className={styles.containerButton}></div>

         <div>
            <Image
               src="/images/ImageCadastro.png"
               width={500}
               height={500}
               alt="Imagem"
               className={styles.BackgroundImageCadastro}
            />
         </div>
      </div>
   );
}
