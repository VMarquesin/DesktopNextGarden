"use client";

import React from "react";
import styles from "./index.module.css";

export default function PsicologoAnotacao() {
   return (
      <div className={styles.container}>
         <aside className={styles.sidebar}>
            <ul className={styles.anotacoesLista}>
               <li>
                  <strong>01/08/2024</strong> <p>Anotação 1</p>
               </li>
               <li>
                  <strong>15/08/2024</strong> <p>Anotação 2</p>
               </li>
               <li>
                  <strong>20/08/2024</strong> <p>Anotação 3</p>
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
