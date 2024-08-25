"use client";

import { useState } from "react";
import styles from "./index.module.css";

export default function PacientePerfil({ paciente, onSaveNote }) {
   const [nota, setNota] = useState("");

   const handleNoteChange = (e) => {
      setNota(e.target.value);
   };

   return (
      <div className={styles.perfilContainer}>
         <img
            src={paciente.foto}
            alt={`Foto de ${paciente.nome}`}
            className={styles.fotoPerfil}
         />
         <h2>{paciente.nome}</h2>
         <h3>{paciente.nickname}</h3>
         <p>Telefone: {paciente.telefone}</p>
         <p>Data de Nascimento: {paciente.dataNascimento}</p>
         <p>CPF: {paciente.cpf}</p>
         <p>Filhos: {paciente.filhos}</p>
         <p>Escolaridade: {paciente.escolaridade}</p>
         <p>Trabalho: {paciente.trabalho}</p>
         <p>Estado Civil: {paciente.estadoCivil}</p>
         <p>Status: {paciente.status}</p>

         <textarea
            placeholder="Adicionar nota..."
            value={nota}
            onChange={handleNoteChange}
            className={styles.textAreaNota}
         />
         <button onClick={() => onSaveNote(nota)}>Salvar Nota</button>
      </div>
   );
}
