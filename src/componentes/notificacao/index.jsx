import { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

import Image from "next/image";
import api from "../../../services/api";

export default function Notificacoes({ dia_id }) {
   const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false); // Se a lista de notificações está visível
   const [notificacao, setNotificacao] = useState([]);
   const [notificacaoSelecionada, setNotificacaoSelecionada] = useState(null);
   const notificacaoRef = useRef(); // Referência para o contêiner

   // Array de uma lista de notificações

   // const notificacoes = [
   //   { id: 1, mensagem: "Nova mensagem de paciente X" },
   //   { id: 2, mensagem: "Sessão agendada com paciente Y" },
   //   { id: 3, mensagem: "Atividade concluída por paciente Z" },
   // ];

   useEffect(() => {
      async function fetchNotificacao() {
         try {
            const response = await api.get(`/diario/${dia_id}`);
            setNotificacao(response.data);
         } catch (error) {
            console.error("Error ao receber notificações:", error);
         }
      }

      fetchNotificacao();
   }, [dia_id]);

   // Alterna entre mostrar ou esconder a lista de notificações

   const toggleNotificacoes = () => {
      setMostrarNotificacoes(!mostrarNotificacoes);
   };

   useEffect(() => {
      // Verifica se clicou fora de notificações
      const handleClickOutside = (event) => {
         if (
            notificacaoRef.current &&
            !notificacaoRef.current.contains(event.target)
         ) {
            setMostrarNotificacoes(false);
         }
      };

      // Ouvinte para cliques no documento

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div>
         {/* Ícone de notificações */}
         <button className={styles.icon} onClick={toggleNotificacoes}>
            {" "}
            {/* visibilidade da lista */}
            <Image
               src="/icones/Notification.svg"
               alt="Notificações"
               width={20}
               height={20}
            />
         </button>

         {/* Lista de notificações que aparece quando o estado mostrarNotificacoes é true */}

         {mostrarNotificacoes && (
            <div ref={notificacaoRef} className={styles.listaNotificacoes}>
               {notificacao.length > 0 ? (
                  notificacao.map((notificacao) => (
                     <li
                        key={notificacao.id}
                        onClick={() => setNotificacaoSelecionada(notificacao)}
                        className={styles.notificacao}
                     >
                        {notificacao.mensagem}
                     </li>
                  ))
               ) : (
                  <div className={styles.notificacao}>Sem notificações</div>
               )}
            </div>
         )}
      </div>
   );
}
