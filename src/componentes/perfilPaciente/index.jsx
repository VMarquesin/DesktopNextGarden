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
               <p>Data de Nascimento: {paciente.pac_data_nasc}</p>
               <p>CPF: {paciente.pac_cpf}</p>
               <p>Filhos: {paciente.pac_filho}</p>
               <p>Escolaridade: {paciente.pac_escolaridade}</p>
               <p>Trabalho: {paciente.pac_trabalho}</p>
               <p>Estado Civil: {paciente.pac_estado_civil}</p>
               <p>Status: {paciente.pac_status}</p>
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
