"use client";

import React from "react";
import styles from "./index.module.css";

export default function PacienteExercicios() {
   return (
      <div className={styles.container}>
         <aside className={styles.sidebar}>
            <ul className={styles.anotacoesLista}>
               <li>
                  <strong>08/09/2024</strong> <p>Atividade 0</p>
               </li>
               <li>
                  <strong>15/05/2024</strong> <p>Atividade 02</p>
               </li>
               <li>
                  <strong>10/02/2024</strong> <p>Atividade 03</p>
               </li>
            </ul>
         </aside>
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
               <input
                  type="text"
                  placeholder="Título"
                  className={styles.tituloInput}
               />
               <textarea
                  placeholder="Escreva suas anotações aqui..."
                  className={styles.textoArea}
               />

               <div className={styles.botoes}>
                  <button className={styles.salvarButton}>Salvar</button>
                  <button className={styles.cancelarButton}>Cancelar</button>
               </div>
            </div>
         </main>
      </div>
   );
}
