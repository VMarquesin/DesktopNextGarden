"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Importando o componente de calendário

import dayGridPlugin from "@fullcalendar/daygrid"; // Importando o plugin de grade diária
import styles from "./index.module.css"; // Importando o arquivo de estilos

// import { Calendar } from "@fullcalendar/core";
// import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendario() {
   const [eventos, setEventos] = useState([
      { title: "Sessão com Paciente A", date: "2024-09-10" },
      { title: "Sessão com Paciente B", date: "2024-09-15" },
   ]);

   return (
      <div className={styles.container}>
         <FullCalendar
            themeSystem="Cyborg"
            plugins={[dayGridPlugin]} // Definindo o plugin de visualização de grade diária
            initialView="dayGridMonth" // Inicializa com a visão mensal
            events={eventos} // Eventos que serão exibidos no calendário
            headerToolbar={{
               left: "prev,next today", // Botões de navegação
               center: "title", // Título centralizado
               right: "dayGridMonth,dayGridWeek", // Alterna entre vista mensal e semanal
            }}
            locale="pt-br" // Definindo o calendário para o idioma português
            buttonText={{
               today: "Hoje",
               month: "Mês",
               week: "Semana",
            }}
         />
      </div>
   );
}

// "use cliente";

// import styles from "./index.module.css";
// import { useState } from "react";

// import Calendar from "react-calendar";

// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";

// export default function LembreteSessao() {
//    const [date, setDate] = useState(new Date());

//    const ChangeDate = (date) => {
//       setDate(date);
//    };

//    return (
//       <div className={styles.calendario}>
//          <h1>Agende uma sessão</h1>
//          <Calendar
//             onChange={ChangeDate}
//             value={date}
//             className={styles.reactCalendar}
//             locate="pt-BR"
//             formatDay={(locate, date) => format(date, "d", { locale: ptBR })}
//             formatMonth={(locale, date) =>
//                format(date, "MMMM yyyy", { locale: ptBR })
//             }
//          />
//          <p>
//             Data selecionada: {format(date, "dd MMMM yyyy", { locale: ptBR })}
//          </p>
//       </div>
//    );
// }
