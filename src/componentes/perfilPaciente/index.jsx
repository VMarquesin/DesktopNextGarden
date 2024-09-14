"use client";

import { useState } from "react";
import styles from "./index.module.css";

export default function PacientePerfil({ paciente, onSaveNote }) {
   const [nota, setNota] = useState("");

   const handleNoteChange = (e) => {
      setNota(e.target.value);
   };

   return (
      <div className={styles.refContainer}>
         <div className={styles.perfilContainer}>
            <div className={styles.containerNome}>
               <img
                  src={paciente.foto}
                  alt={`Foto ${paciente.nome}`}
                  className={styles.fotoPerfil}
               />
               <div className={styles.nome}>
                  <h2>{paciente.nome}</h2>
                  <h3>{paciente.nickname}</h3>
               </div>
            </div>
            <div className={styles.atributos}>
               <p>Telefone: {paciente.pac_telefone}</p>
               <p>Data de Nascimento: {paciente.dataNascimento}</p>
               <p>CPF: {paciente.cpf}</p>
               <p>Filhos: {paciente.filhos}</p>
               <p>Escolaridade: {paciente.escolaridade}</p>
               <p>Trabalho: {paciente.trabalho}</p>
               <p>Estado Civil: {paciente.estadoCivil}</p>
               <p>Status: {paciente.status}</p>
            </div>
            <div className={styles.containerNotaSave}>

               <textarea
                  placeholder="Adicionar nota..."
                  value={nota}
                  onChange={handleNoteChange}
                  className={styles.notaTextarea}
               />
               
               <div className={styles.containerButton}>
                  <button
                     onClick={() => onSaveNote(nota)}
                     className={styles.saveButton}
                  >
                     Salvar Nota
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
