"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// import InputMask from 'react-input-mask';
import Image from "next/image";

import styles from "./page.module.css";
import api from "@/services/api";
import axios from "axios";
import { handleClientScriptLoad } from "next/script";

export default function Cadastro() {
   const router = useRouter();
   const [senhaVisivel, setSenhaVisivel] = useState(false);
   const [confirmVisivel, setConfirmVisivel] = useState(false);

   const toggleSenhaVisivel = () => {
      setSenhaVisivel((prevState) => !prevState);
   };

   const toggleConfirmVisivel = () => {
      setConfirmVisivel((prevState) => !prevState);
   };
   // info
   const [psicologo, setPsicologo] = useState({
      usu_nome: "",
      usu_nick: "",
      usu_email: "",
      usu_senha: "",
      confSenha: "",
      psi_cnpj: "",
      end_cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
   });

   const valDefault = styles.formControl;
   const valSucesso = styles.formControl + " " + styles.success;
   const valErro = styles.formControl + " " + styles.error;

   const getCepInfo = async () => {
      const url = "https://viacep.com.br/ws/" + psicologo.end_cep + "/json/";
      console.log(url);
      const response = await axios.get(url);
      const { data } = response;
      console.log(data);
      setPsicologo((prev) => ({
         ...prev,
         cidade: data.localidade || "",
         estado: data.estado || "",
         bairro: data.bairro || "",
         endereco: data.logradouro || "",
      }));
   };

   // validação
   const [valida, setValida] = useState({
      nome: {
         validado: valDefault,
         mensagem: [],
      },
      nick: {
         validado: valDefault,
         mensagem: [],
      },
      email: {
         validado: valDefault,
         mensagem: [],
      },
      senha: {
         validado: valDefault,
         mensagem: [],
      },
      confSenha: {
         validado: valDefault,
         mensagem: [],
      },
      cnpj: {
         validado: valDefault,
         mensagem: [],
      },
      cep: {
         validado: valDefault,
         mensagem: [],
      },
      logradouro: {
         validado: valDefault,
         mensagem: [],
      },
      numero: {
         validado: valDefault,
         mensagem: [],
      },
      bairro: {
         validado: valDefault,
         mensagem: [],
      },
      cidade: {
         validado: valDefault,
         mensagem: [],
      },
      estado: {
         validado: valDefault,
         mensagem: [],
      },
   });

   const handleChange = (e) => {
      setPsicologo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(psicologo);
   };

   function validaNome() {
      let objTemp = {
         validado: valSucesso, // css referente ao estado de validação
         mensagem: [], // array de mensagens de validação
      };

      if (psicologo.usu_nome === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O nome do usuário é obrigatório");
      } else if (psicologo.usu_nome.length < 5) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira o nome completo do usuário");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         nome: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaNick() {
      let objTemp = {
         validado: valSucesso, // css referente ao estado de validação
         mensagem: [], // array de mensagens de validação
      };

      if (psicologo.usu_nick === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O apelido do usuário é obrigatório");
      } else if (psicologo.usu_nick.length < 5) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira o apelido do usuário");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         nick: objTemp, // atualiza apenas o campo 'nick'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function checkEmail(email) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
         email
      );
   }

   function validaEmail() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.usu_email === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O e-mail do usuário é obrigatório");
      } else if (!checkEmail(psicologo.usu_email)) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira um e-mail válido");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         email: objTemp, // atualiza apenas o campo 'email'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaSenha() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.usu_senha === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O preenchimento da senha é obrigatório");
      } else if (psicologo.usu_senha < 3) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("A senha deve ter pelo menos 3 caracteres");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         senha: objTemp, // atualiza apenas o campo 'senha'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaConfSenha() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.confSenha === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("A confirmação da senha é obrigatória");
      } else if (psicologo.confSenha !== psicologo.usu_senha) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("A senha e a confirmação devem ser iguais");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         confSenha: objTemp, // atualiza apenas o campo 'Confirma senha'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaCnpj() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.psi_cnpj == 0) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira o CNPJ da empresa");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         cnpj: objTemp, // atualiza apenas o campo 'cnpj'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaCep() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.end_cep == 0) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Selecione o CEP");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         cep: objTemp, // atualiza apenas o campo 'cep'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaLogradouro() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.psi_endereco === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O endereço é um campo obrigatório");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         logradouro: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaBairro() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.bairro === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("É necessário inserir o nome do bairro");
      } else if (psicologo.end_bairro.length < 4) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira o nome completo do bairro");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         bairro: objTemp, // atualiza apenas o campo 'bairro'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaNumero() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.numero === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O número do imóvel é um campo obrigatório");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         numero: objTemp, // atualiza apenas o campo 'numero'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaCidade() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.cidade == "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Selecione a cidade");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         cidade: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaEstado() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.estado == "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Selecione o estado");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         estado: objTemp, // atualiza apenas o campo 'estado'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   async function handleSubmit(event) {
      event.preventDefault();
      // alert('chama api');

      try {
         let confirmaCad;
         console.log(psicologo);
         const response = await api.post("/psicologo", psicologo);

         confirmaCad = response.data.sucesso;

         if (confirmaCad) {
            router.push("/");
         }
      } catch (error) {
         if (error.response) {
            alert(
               error.response.data.mensagem + "\n" + error.response.data.dados
            );
         } else {
            alert("Erro no front-end" + "\n" + error);
         }
      }
   }

   return (
      <div className={styles.CadastroContainer}>
         <div className={styles.CadastroAcess}>
            <div className={styles.CadastroForm}>
               <Link href={"/usuarios/login"} className={styles.ButtonRetornar}>
                  RETORNAR
               </Link>

               <div className={styles.Titulo}>
                  <label htmlFor="nomeProjeto">GARDEN</label>
                  <label htmlFor="Acesse" className={styles.CriarConta}>
                     Criar conta:
                  </label>
               </div>

               <form>
                  <div className={styles.FormGroup}>
                     <input
                        type="text"
                        id="name"
                        name="usu_nome"
                        placeholder="Nome completo"
                        onChange={handleChange}
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
                        name="usu_nick"
                        placeholder="Nome de Usuário"
                        onChange={handleChange}
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
                        name="usu_email"
                        onChange={handleChange}
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
                        type={senhaVisivel ? "text" : "password"}
                        id="password"
                        name="usu_senha"
                        onChange={handleChange}
                        placeholder="Digite sua Senha"
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/OcultaSenha.svg"
                        width={25}
                        height={25}
                        onClick={toggleSenhaVisivel}
                        alt="Icone Senha"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type={confirmVisivel ? "text" : "password"}
                        id="password"
                        name="confSenha"
                        onChange={handleChange}
                        placeholder="Confirme sua Senha"
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/OcultaSenha.svg"
                        width={25}
                        height={25}
                        onClick={toggleConfirmVisivel}
                        alt="Icone Senha"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="CNPJ"
                        id="CNPJ"
                        name="psi_cnpj"
                        onChange={handleChange}
                        placeholder="CNPJ (Opcional)"
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/iconeCNPJ.svg"
                        width={25}
                        height={25}
                        alt="Icone CNPJ"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="CEP"
                        id="CEP"
                        name="end_cep"
                        placeholder="Digite seu CEP"
                        className={styles.InputField}
                        onChange={handleChange}
                        onBlur={getCepInfo}
                        value={psicologo.end_cep}
                     />
                     <Image
                        src="/icones/IconeCEP.svg"
                        width={25}
                        height={25}
                        alt="Icone CEP"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        id="Estado"
                        name="estado"
                        placeholder="Digite seu Estado"
                        className={styles.InputFieldUF}
                        onChange={handleChange}
                        value={psicologo.estado}
                     />
                     <Image
                        src="/icones/IconeEstado.svg"
                        width={25}
                        height={25}
                        alt="Icone Estado"
                        className={styles.IconsUF}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="Endereco"
                        id="Endereco"
                        name="endereco"
                        placeholder="Digite seu Endereço"
                        className={styles.InputField}
                        value={psicologo.endereco}
                        onChange={handleChange}
                     />
                     <Image
                        src="/icones/IconeEndereco.svg"
                        width={25}
                        height={25}
                        alt="Icone Endereco"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="Numero"
                        id="Numero"
                        name="numero"
                        placeholder="Digite seu Número"
                        onChange={handleChange}
                        className={styles.InputField}
                     />
                     <Image
                        src="/icones/IconeNumero.svg"
                        width={25}
                        height={25}
                        alt="Icone Numero"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="Bairro"
                        id="Bairro"
                        name="bairro"
                        placeholder="Digite seu Bairro"
                        className={styles.InputField}
                        onChange={handleChange}
                        value={psicologo.bairro}
                     />
                     <Image
                        src="/icones/IconeEndereco.svg"
                        width={25}
                        height={25}
                        alt="Icone Bairro"
                        className={styles.Icons}
                     />
                  </div>

                  <div className={styles.FormGroup}>
                     <input
                        type="Cidada"
                        id="Cidade"
                        name="cidade"
                        placeholder="Digite sua Cidade"
                        className={styles.InputField}
                        onChange={handleChange}
                        value={psicologo.cidade}
                     />
                     <Image
                        src="/icones/IconeCidade.svg"
                        width={25}
                        height={25}
                        alt="Icone Cidade"
                        className={styles.Icons}
                     />
                  </div>

                  <button
                     type="submit"
                     className={styles.SubmitButton}
                     onClick={handleSubmit}
                  >
                     CADASTRAR
                  </button>
               </form>
            </div>
         </div>

         <div className={styles.containerButton}></div>

         <div>
            <Image
               src="/images/ImageCadastro.png"
               width={2880}
               height={2048}
               alt="Imagem"
               className={styles.BackgroundImageCadastro}
            />
         </div>
      </div>
   );
}
