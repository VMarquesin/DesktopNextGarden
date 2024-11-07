"use client";

import { useState } from "react";
import styles from "./index.module.css";

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
      pac_data_nasc: "",
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
            <button className={styles.closeButton} onClick={onClose}>
               x
            </button>
            <h2 className={styles.titulo}>Cadastro de Paciente</h2>
            <form onSubmit={handleSubmit}>
               {[
                  "usu_nome",
                  "usu_nick",
                  "usu_email",
                  "usu_senha",
                  "pac_telefone",
                  "pac_cpf",
                  "pac_filho",
                  "pac_escolaridade",
                  "pac_data_nasc",
                  "pac_trabalho",
                  "pac_estado_civil",
               ].map((field) => (
                  <div key={field} className={styles.formGroup}>
                     <label htmlFor={field}>
                        {field.replace(/_/g, " ").toUpperCase()}
                     </label>
                     <input
                        type={
                           field === "usu_email"
                              ? "email"
                              : field.includes("senha")
                              ? "password"
                              : field === "pac_data_nasc"
                              ? "date"
                              : "text"
                        }
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                     />
                  </div>
               ))}
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
