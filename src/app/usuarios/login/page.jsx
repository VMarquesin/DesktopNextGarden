"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./page.module.css";
import api from "../../../services/api";
import { UserContext } from "../../../../context/userContext";

function Login() {
   const { login_psicologo } = useContext(UserContext);
   const router = useRouter();

   const [login, setLogin] = useState("");
   const [senha, setSenha] = useState("");
   const [senhaVisivel, setSenhaVisivel] = useState(false);
   const [error, setError] = useState(""); // Estado para mensagens de erro
   const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

   const toggleSenhaVisivel = () => {
      setSenhaVisivel((prevState) => !prevState);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!login || !senha) {
         setError("Por favor, preencha todos os campos.");
         return;
      }

      setLoading(true); // Inicia o carregamento
      setError(""); // Limpa mensagens de erro anteriores

      try {
         const isLogged = await login_psicologo(login, senha);
         if (isLogged) {
            router.push("/system");
         } else {
            setError("Usuário ou senha incorretos.");
         }
      } catch (error) {
         console.error("Erro ao realizar login:", error);
         setError("Erro inesperado. Tente novamente mais tarde.");
      } finally {
         setLoading(false); // Finaliza o carregamento
      }
   };

   return (
      <div className={styles.LoginContainer}>
         <div className={styles.LoginAcess}>
            <div className={styles.LoginForm}>
               <Link
                  href="/usuarios/cadastro"
                  className={styles.ButtonCadastro}
               >
                  CRIAR CONTA
               </Link>

               <div className={styles.Titulo}>
                  <label htmlFor="nomeProjeto">GARDEN</label>
                  <label htmlFor="Acesse" className={styles.AcesseSuaConta}>
                     Acesse sua conta:
                  </label>
               </div>

               <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.FormGroup}>
                     <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        onChange={(v) => setLogin(v.target.value)}
                        value={login}
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
                        type={senhaVisivel ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Senha"
                        onChange={(v) => setSenha(v.target.value)}
                        value={senha}
                        className={styles.InputField}
                     />
                     <Image
                        src="/Icones/OcultaSenha.svg"
                        width={25}
                        height={25}
                        onClick={toggleSenhaVisivel}
                        alt="Icone Senha"
                        className={styles.Icons}
                     />
                  </div>
                  {/* Exibe erros */}
                  {/* Indicador de carregamento */}
                 
                  {error && <p className={styles.ErrorMessage}>{error}</p>}{" "}
                  {loading && (
                     <p className={styles.LoadingMessage}>Entrando...</p>
                  )}{" "}
                 
                  <button
                     type="submit"
                     className={styles.SubmitButton}
                     disabled={loading} // Desativa o botão enquanto carrega
                  >
                     {loading ? "Carregando..." : "ENTRAR"}
                  </button>
               </form>

               {/* <label
                  htmlFor="Esqueceu sua senha?"
                  className={styles.EsqueceuSuaSenha}
               >
                  Esqueceu sua senha?
               </label> */}
            </div>
         </div>

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

export default Login;
