import { useState, useEffect } from "react";

import styles from "./index.module.css"
import Image from "next/image";

export default function Notificacoes() {
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  // Exemplo de lista de notificações
  const notificacoes = [
    { id: 1, mensagem: "Nova mensagem de paciente X" },
    { id: 2, mensagem: "Sessão agendada com paciente Y" },
    { id: 3, mensagem: "Atividade concluída por paciente Z" },
  ];

  // Alterna entre mostrar ou esconder a lista de notificações
  const toggleNotificacoes = () => {
    setMostrarNotificacoes(!mostrarNotificacoes);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
       if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setShowNotifications(false);
       }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
       document.removeEventListener('mousedown', handleClickOutside);
    };
 }, []);
  return (
    <div>
      {/* Ícone de notificações */}
      <button  className={styles.icon} onClick={toggleNotificacoes}>
        <Image
          src="/icones/Notification.svg"
          alt="Notificações"
          width={20}
          height={20}
         
        />
      </button>

      {/* Lista de notificações que aparece quando o estado mostrarNotificacoes é true */}
      {mostrarNotificacoes && (
        <div className={styles.listaNotificacoes}>
          {notificacoes.length > 0 ? (
            notificacoes.map((notificacao) => (
              <div key={notificacao.id} className={styles.notificacao}>
                {notificacao.mensagem}
              </div>
            ))
          ) : (
            <div className={styles.notificacao}>Sem notificações</div>
          )}
        </div>
      )}
    </div>
  )
};



// import { useState, useEffect, useRef } from "react";

// export default function NotificacaoButton() {
//    const [showNotifications, setShowNotifications] = useState(false);
//    const [notifications, setNotifications] = useState([
//       // Exemplo de notificações
//       { id: 1, message: "Você tem uma nova mensagem" },
//       { id: 2, message: "Sua sessão foi agendada" },
//    ]);

//    const notificationRef = useRef();

//    const toggleNotifications = () => {
//       setShowNotifications(!showNotifications);
//    };

//    // Fechar a lista de notificações quando clicar fora dela
//    useEffect(() => {
//       const handleClickOutside = (event) => {
//          if (
//             notificationRef.current &&
//             !notificationRef.current.contains(event.target)
//          ) {
//             setShowNotifications(false);
//          }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//          document.removeEventListener("mousedown", handleClickOutside);
//       };
//    }, []);

//    return (
//       <div className="notification-container">
//          {/* Botão de notificações */}
//          <button onClick={toggleNotifications} aria-label="Notificações">
//             <Image
//                src="/icones/Notification.svg"
//                alt="Notificações"
//                width={20}
//                height={20}
//             />
//             {notifications.length > 0 && (
//                <span className="badge">{notifications.length}</span>
//             )}
//          </button>

//          {/* Lista de notificações */}
//          {showNotifications && (
//             <div
//                ref={notificationRef}
//                className="notification-list"
//                role="menu"
//             >
//                {notifications.length === 0 ? (
//                   <p>Sem notificações</p>
//                ) : (
//                   <ul>
//                      {notifications.map((notification) => (
//                         <li key={notification.id}>{notification.message}</li>
//                      ))}
//                   </ul>
//                )}
//             </div>
//          )}
//       </div>
//    );
// }

// import React, { useState, useRef, useEffect } from "react";
// import styles from "./index.module.css";
// import Image from "next/image";

// const Notifications = ({ notifications }) => {

//    const [showNotifications, setShowNotifications] = useState(false);
//    const containerRef = useRef(null);

//    const toggleNotifications = () => {
//       setShowNotifications((prev) => !prev);
//    };

//    useEffect(() => {
//       const handleClickOutside = (event) => {
//          if (
//             containerRef.current &&
//             !containerRef.current.contains(event.target)
//          ) {
//             setShowNotifications(false);
//          }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//          document.removeEventListener("mousedown", handleClickOutside);
//       };
//    }, []);

//    return (
//       <div className={styles.notificationContainer} ref={containerRef}>
//          <button
//             onClick={toggleNotifications}
//             className={styles.notificationButton}
//             aria-haspopup="true"
//             aria-expanded={showNotifications}
//             aria-label="Notificações"
//          >
//             <Image
//                src="/icones/Notification.svg"
//                alt="Notificações"
//                width={24}
//                height={24}
//                //   className={styles.icon}
//             />
//             {notifications && notifications.length > 0 && (
//                <span className={styles.badge}>{notifications.length}</span>
//             )}
//          </button>
//          {showNotifications && notifications && (
//             <div className={styles.notificationList} role="menu">
//                {notifications.length === 0 ? (
//                   <p className={styles.empty}>Sem notificações</p>
//                ) : (
//                   <ul>
//                      {notifications.map((notif, index) => (
//                         <li
//                            key={index}
//                            className={styles.notificationItem}
//                            role="menuitem"
//                         >
//                            {notif.message}
//                         </li>
//                      ))}
//                   </ul>
//                )}
//             </div>
//          )}
//       </div>
//    );
// };

// export default Notifications;
