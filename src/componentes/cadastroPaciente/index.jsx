"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import Image from "next/image";

import api from "@/services/api";
import { UserContext } from "../../../context/userContext";

export default function CadastroPaciente({ onClose }) {
   //busca as informado psicologo no context
   const { psicologoInfo } = useContext(UserContext);

   const router = useRouter();

   //definição do estado para armazenar os dados do formulário
   const [formData, setFormData] = useState({
      usu_nome: "",
      usu_nick: "",
      usu_email: "",
      usu_senha: "",
      pac_telefone: "",
      pac_cpf: "",
      pac_filho: "",
      pac_escolaridade: "",
      pac_data_nasc: "2003-02-10",
      pac_trabalho: "",
      pac_estado_civil: "",
      psi_id: "",
   });
   //armazenar erros de validadação nos campos
   const [errors, setErrors] = useState({});
   //visibilidade do campo senha
   const [passwordVisible, setPasswordVisible] = useState(false);
   //função para alterar o valor de um campo do formulario
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };
   //função para alterar a visibilidade da senha
   const handleTogglePassword = () => {
      setPasswordVisible(!passwordVisible);
   };
   //envia o formulario
   const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};

      // Validação dos campos obrigatórios
      Object.entries(formData).forEach(([key, value]) => {
         if (typeof value === "string" && !value.trim()) {
            newErrors[key] = "Este campo é obrigatório.";
         } else if (!value) {
            newErrors[key] = "Este campo é obrigatório.";
         }
      });

      // Caso tenha erros, atualiza o estado e não continua
      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      try {
         // Envia os dados para API
         console.log("Dados do paciente:", formData);
         const response = await api.post("/paciente", formData);

         if (response.data.sucesso) {
            alert("Cadastro realizado com sucesso!");
            router.push("/system"); // Redireciona após o sucesso
         }
      } catch (error) {
         console.error(error);
         alert("Erro ao cadastrar paciente: " + error.message);
      }
   };

   //fecha o modal se clicar fora
   const handleOutsideClick = (e) => {
      if (e.target.classList.contains(styles.modalOverlay)) {
         onClose();
      }
   };
   //dados do psicologo
   useEffect(() => {
      if (psicologoInfo?.psi_id) {
         setFormData((prevFormData) => ({
            ...prevFormData,
            psi_id: psicologoInfo.psi_id,
         }));
      }
   }, [psicologoInfo]);

   return (
      // close modal
      <div className={styles.modalOverlay} onClick={handleOutsideClick}>
         <div className={styles.modalContent}>
            <h2 className={styles.titulo}>Cadastro de Paciente</h2>
            <form onSubmit={handleSubmit}>
               <InputCadastro
                  label="Nome"
                  inputType="text"
                  name="usu_nome"
                  value={formData.usu_nome}
                  handleChange={handleChange}
                  error={errors.usu_nome}
               />

               <InputCadastro
                  label="Nick"
                  inputType="text"
                  name="usu_nick"
                  value={formData.usu_nick}
                  handleChange={handleChange}
                  error={errors.usu_nick}
               />
               <InputCadastro
                  label="E-mail"
                  inputType="text"
                  name="usu_email"
                  value={formData.usu_email}
                  handleChange={handleChange}
                  error={errors.usu_email}
               />
               <div className={styles.formGroup}>
                  <label htmlFor="usu_senha">Senha</label>
                  <div className={styles.passwordWrapper}>
                     <input
                        type={passwordVisible ? "text" : "password"}
                        id="usu_senha"
                        name="usu_senha"
                        value={formData.usu_senha}
                        onChange={handleChange}
                     />
                     <Image
                        src={
                           passwordVisible
                              ? "/Icones/OcultaSenha.svg"
                              : "/Icones/OcultaSenha.svg"
                        }
                        width={25}
                        height={25}
                        alt="Alternar visibilidade"
                        onClick={handleTogglePassword}
                        className={styles.passwordToggle}
                     />
                  </div>
                  {errors.usu_senha && (
                     <span className={styles.errorText}>
                        {errors.usu_senha}
                     </span>
                  )}
               </div>

               <InputCadastro
                  label="Telefone"
                  inputType="text"
                  name="pac_telefone"
                  value={formData.pac_telefone}
                  handleChange={handleChange}
                  error={errors.pac_telefone}
               />
               <InputCadastro
                  label="CPF"
                  inputType="text"
                  name="pac_cpf"
                  value={formData.pac_cpf}
                  handleChange={handleChange}
                  error={errors.pac_cpf}
               />
               <InputCadastro
                  label="Filhos"
                  inputType="text"
                  name="pac_filho"
                  value={formData.pac_filho}
                  handleChange={handleChange}
                  error={errors.pac_filho}
               />
               <InputCadastro
                  label="Escolaridade"
                  inputType="text"
                  name="pac_escolaridade"
                  value={formData.pac_escolaridade}
                  handleChange={handleChange}
                  error={errors.pac_escolaridade}
               />

               <InputCadastro
                  label="Profissão"
                  inputType="text"
                  name="pac_trabalho"
                  value={formData.pac_trabalho}
                  handleChange={handleChange}
                  error={errors.pac_trabalho}
               />
               <InputCadastro
                  label="Estado Civil"
                  inputType="text"
                  name="pac_estado_civil"
                  value={formData.pac_estado_civil}
                  handleChange={handleChange}
                  error={errors.pac_estado_civil}
               />
               <div className={styles.formActions}>
                  <button type="submit" className={styles.submitButton}>
                     <p>Cadastrar</p>
                  </button>
                  <button
                     type="button"
                     className={styles.cancelButton}
                     onClick={onClose}
                  >
                     <p>Cancelar</p>
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

function InputCadastro({ label, inputType, name, value, handleChange, error }) {
   return (
      <div className={styles.formGroup}>
         <label htmlFor={name}>{label}</label>
         <input
            type={inputType}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            required
         />
         {error && <span className={styles.error}>{error}</span>}
      </div>
   );
}

{
   /* <InputCadastro 
                  label="Data de nascimento"
                  inputType="text"
                  name="pac_data_nasc"
                  value={formData.pac_data_nasce}
                  handleChange={handleChange}
               /> */
}
