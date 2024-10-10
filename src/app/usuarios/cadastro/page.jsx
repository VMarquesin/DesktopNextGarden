"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// import InputMask from 'react-input-mask';
import Image from "next/image";

import styles from "./page.module.css";
import api from "@/services/api";
import axios from "axios";

export default function Cadastro() {
   const router = useRouter();
   const [ufs, setUfs] = useState([]);
   const [cidades, setCidades] = useState([]);

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

   useEffect(() => {
      listaUfs();
   }, []);

   const getCepInfo = async () => {
      console.log(psicologo.CEP);
      const url = "https://viacep.com.br/ws/" + psicologo.CEP + "/json/";
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

   // useEffect(() => {
   //    listaCidades();
   //    setPsicologo((prev) => ({ ...prev, cid_id: "0" }));
   // }, [estado.est_id]);

   async function listaUfs() {
      try {
         const response = await api.get("/estado");
         setUfs(response.data.dados);
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

   async function listaCidades() {
      if (estado.est_id) {
         const dados = {
            cid_uf: estado.est_id,
         };
         try {
            const response = await api.post("/cidades", dados);
            setCidades(response.data.dados);
         } catch (error) {
            if (error.response) {
               alert(
                  error.response.data.mensagem +
                     "\n" +
                     error.response.data.dados
               );
            } else {
               alert("Erro no front-end" + "\n" + error);
            }
         }
      }
   }

   // validação
   const [valida, setValida] = useState({
      nome: {
         validado: valDefault,
         mensagem: [],
      },
      apelido: {
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

      if (usuario.usu_nome === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O nome do usuário é obrigatório");
      } else if (usuario.usu_nome.length < 5) {
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

   // function validaNascimento() {  //CONFIRMAR SE IRA USAR!!!!!!!!!!!!!!!
   //    // Obtém a data atual
   //    const hoje = new Date();
   //    const anoAtual = hoje.getFullYear();

   //    // Converte a data de nascimento para um objeto Date
   //    const dataNascimentoObj = new Date(usuario.usu_dt_nasc);

   //    let objTemp = {
   //       validado: valSucesso, // css referente ao estado de validação
   //       mensagem: [], // array de mensagens de validação
   //    };

   //    if (usuario.usu_dt_nasc === "") {
   //       objTemp.validado = valErro;
   //       objTemp.mensagem.push("O preenchimento da data é obrigatório");
   //    } else if (dataNascimentoObj > hoje) {
   //       objTemp.validado = valErro;
   //       objTemp.mensagem.push("A data de nascimento não pode ser futura");
   //    } else {
   //       // Calcula a idade
   //       const anoNascimento = dataNascimentoObj.getFullYear();
   //       const idade = anoAtual - anoNascimento;
   //       if (idade > 100) {
   //          objTemp.validado = valErro;
   //          objTemp.mensagem.push("A idade não pode ser superior a 100 anos");
   //       }
   //       if (idade < 14) {
   //          objTemp.validado = valErro;
   //          objTemp.mensagem.push("A idade não pode ser inferior a 14 anos");
   //       }
   //    }

   //    setValida((prevState) => ({
   //       ...prevState, // mantém os valores anteriores
   //       nascimento: objTemp, // atualiza apenas o campo 'nome'
   //    }));

   //    const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
   //    return testeResult;
   // }

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

      if (usuario.usu_email === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O e-mail do usuário é obrigatório");
      } else if (!checkEmail(usuario.usu_email)) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira um e-mail válido");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         email: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   // function validaCpf() {
   //    let objTemp = {
   //       validado: valSucesso,
   //       mensagem: [],
   //    };

   //    // Remove todos os caracteres não numéricos
   //    const cpf = usuario.usu_cpf.replace(/\D/g, "");

   //    if (cpf.length < 11) {
   //       objTemp.validado = valErro;
   //       objTemp.mensagem.push("O CPF precisa ter 11 dígitos");
   //    } else if (/^(\d)\1{10}$/.test(cpf)) {
   //       objTemp.validado = valErro;
   //       objTemp.mensagem.push("O CPF digitado é inválido");
   //    } else if (validaDigitosCPF(cpf) === false) {
   //       objTemp.validado = valErro;
   //       objTemp.mensagem.push("O CPF digitado é inválido");
   //    }

   //    setValida((prevState) => ({
   //       ...prevState, // mantém os valores anteriores
   //       cpf: objTemp, // atualiza apenas o campo 'nome'
   //    }));

   //    const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
   //    return testeResult;
   // }

   // function validaDigitosCPF(cpf) {
   //    // Valida os dígitos verificadores
   //    let soma = 0;
   //    let resto;
   //    for (let i = 1; i <= 9; i++) {
   //       soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
   //    }
   //    resto = (soma * 10) % 11;
   //    if (resto === 10 || resto === 11) {
   //       resto = 0;
   //    }
   //    if (resto !== parseInt(cpf.substring(9, 10))) {
   //       return false;
   //    }

   //    soma = 0;
   //    for (let i = 1; i <= 10; i++) {
   //       soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
   //    }
   //    resto = (soma * 10) % 11;
   //    if (resto === 10 || resto === 11) {
   //       resto = 0;
   //    }
   //    if (resto !== parseInt(cpf.substring(10, 11))) {
   //       return false;
   //    }

   //    return true;
   // }

   function validaEstado() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (estado.est_id == 0) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Selecione o estado");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         uf: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaCidade() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (cidades.cid_id == 0) {
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

   function validaLogradouro() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (psicologo.psi_endereco === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O endereço é um campo obrigatório");
      } else if (usuario.end_logradouro.length < 5) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira o endereço completo");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         logradouro: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaNumero() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (endereco_usuario.end_numero === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O número do imóvel é um campo obrigatório");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         numero: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaBairro() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (endereco_usuario.bai_id === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("É necessário inserir o nome do bairro");
      } else if (usuario.end_bairro.length < 4) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("Insira o nome completo do bairro");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         bairro: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   // function validaComplemento() {
   //    let objTemp = {
   //       validado: valSucesso,
   //       mensagem: [],
   //    };

   //    setValida((prevState) => ({
   //       ...prevState, // mantém os valores anteriores
   //       complemento: objTemp, // atualiza apenas o campo 'nome'
   //    }));

   //    const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
   //    return testeResult;
   // }

   // function validaCelular() {
   //    let objTemp = {
   //       validado: valSucesso,
   //       mensagem: [],
   //    };

   //    if (usuario.cli_cel === "") {
   //       objTemp.validado = valErro;
   //       objTemp.mensagem.push("O nº do celular é obrigatório");
   //    } else if (usuario.cli_cel.length < 11) {
   //       objTemp.validado = valErro;
   //       objTemp.mensagem.push(
   //          "O número do celular deve ter pelo menos 11 dígitos"
   //       );
   //    }

   //    setValida((prevState) => ({
   //       ...prevState, // mantém os valores anteriores
   //       celular: objTemp, // atualiza apenas o campo 'nome'
   //    }));

   //    const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
   //    return testeResult;
   // }

   function validaSenha() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (usuario.usu_senha === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("O preenchimento da senha é obrigatório");
      } else if (usuario.usu_senha < 3) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("A senha deve ter pelo menos 3 caracteres");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         senha: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   function validaConfSenha() {
      let objTemp = {
         validado: valSucesso,
         mensagem: [],
      };

      if (usuario.confSenha === "") {
         objTemp.validado = valErro;
         objTemp.mensagem.push("A confirmação da senha é obrigatória");
      } else if (usuario.confSenha !== usuario.usu_senha) {
         objTemp.validado = valErro;
         objTemp.mensagem.push("A senha e a confirmação devem ser iguais");
      }

      setValida((prevState) => ({
         ...prevState, // mantém os valores anteriores
         confSenha: objTemp, // atualiza apenas o campo 'nome'
      }));

      const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
      return testeResult;
   }

   async function handleSubmit(event) {
      event.preventDefault();
      let itensValidados = 0;
      itensValidados += validaNome();
      itensValidados += validaApelido();
      itensValidados += validaEmail();
      itensValidados += validaSenha();
      itensValidados += validaConfSenha();
      itensValidados += validaCnpj();
      itensValidados += validaCep();
      itensValidados += validaLogradouro();
      itensValidados += validaNumero();
      itensValidados += validaBairro();
      itensValidados += validaCidade();
      itensValidados += validaEstado();

      // salvar quando atingir o número de itens a serem validados
      // alert(itensValidados);
      if (itensValidados === 12) {
         // alert('chama api');

         try {
            let confirmaCad;
            const response = await api.post("/usuarios", usuario);

            confirmaCad = response.data.sucesso;

            if (confirmaCad) {
               router.push("/");
            }
         } catch (error) {
            if (error.response) {
               alert(
                  error.response.data.mensagem +
                     "\n" +
                     error.response.data.dados
               );
            } else {
               alert("Erro no front-end" + "\n" + error);
            }
         }
      }
   }

   return (
      <div className={styles.CadastroContainer}>
         <div className={styles.CadastroAcess}>
            <div className={styles.CadastroForm}>
               <button type="submit" className={styles.ButtonRetornar}>
                  RETORNAR
               </button>

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

                  <div className={styles.FormGroup}>
                     <input
                        type="CNPJ"
                        id="CNPJ"
                        name="Cadastro de Pessoa Jurica"
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
                        id="Estado"
                        name="estado"
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
                        type="CEP"
                        id="CEP"
                        name="CEP"
                        placeholder="Digite seu CEP"
                        className={styles.InputField}
                        onChange={handleChange}
                        onBlur={getCepInfo}
                        value={psicologo.CEP}
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
               width={2880}
               height={2048}
               alt="Imagem"
               className={styles.BackgroundImageCadastro}
            />
         </div>
      </div>
   );
}
