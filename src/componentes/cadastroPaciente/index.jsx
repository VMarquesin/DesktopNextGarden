"use client";

import { useState } from "react";
import styles from "./index.module.css";
import api from "@/services/api";

export default function CadastroPaciente({ onClose }) {
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
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         console.log("Dados do paciente:", formData);
         // Substitua 'api.post' pelo endpoint correto para enviar os dados

         const response = await api.post("/paciente", formData);

         if (response.data.sucesso) {
            alert("Cadastro realizado com sucesso!");
            onClose();
         }
      } catch (error) {
         console.log(error);
         alert("Erro ao cadastrar paciente: " + error.message);
      }
   };

   const handleOutsideClick = (e) => {
      if (e.target.classList.contains(styles.modalOverlay)) {
         onClose();
      }
   };

   return (
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
               />
               <InputCadastro
                  label="Nick"
                  inputType="text"
                  name="usu_nick"
                  value={formData.usu_nick}
                  handleChange={handleChange}
               />
               <InputCadastro
                  label="E-mail"
                  inputType="text"
                  name="usu_email"
                  value={formData.usu_email}
                  handleChange={handleChange}
               />
               <InputCadastro
                  label="Senha"
                  inputType="text"
                  name="usu_senha"
                  value={formData.usu_senha}
                  handleChange={handleChange}
               />
               <InputCadastro
                  label="Telefone"
                  inputType="text"
                  name="pac_telefone"
                  value={formData.pac_telefone}
                  handleChange={handleChange}
               />
               <InputCadastro
                  label="CPF"
                  inputType="text"
                  name="pac_cpf"
                  value={formData.pac_cpf}
                  handleChange={handleChange}
               />
               <InputCadastro
                  label="Filhos"
                  inputType="text"
                  name="pac_filho"
                  value={formData.pac_filho}
                  handleChange={handleChange}
               />
               <InputCadastro
                  label="Escolaridade"
                  inputType="text"
                  name="pac_escolaridade"
                  value={formData.pac_escolaridade}
                  handleChange={handleChange}
               />
               {/* <InputCadastro 
                  label="Data de nascimento"
                  inputType="text"
                  name="pac_data_nasc"
                  value={formData.pac_data_nasce}
                  handleChange={handleChange}
               /> */}
               <InputCadastro
                  label="Profissão"
                  inputType="text"
                  name="pac_trabalho"
                  value={formData.pac_trabalho}
                  handleChange={handleChange}
               />
               <InputCadastro
                  label="Estado Civil"
                  inputType="text"
                  name="pac_estado_civil"
                  value={formData.pac_estado_civil}
                  handleChange={handleChange}
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

function InputCadastro({ label, inputType, name, value, handleChange }) {
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
      </div>
   );
}
