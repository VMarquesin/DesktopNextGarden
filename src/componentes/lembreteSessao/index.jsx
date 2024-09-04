"use cliente";

import styles from "./index.module.css";
import { useState } from "react";

import Calendar from "react-calendar";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function LembreteSessao() {
   const [date, setDate] = useState(new Date());

   const ChangeDate = (date) => {
      setDate(date);
   };

   return (
      <div className={styles.calendario}>
         <h1>Agende uma sessão</h1>
         <Calendar
            onChange={ChangeDate}
            value={date}
            className={styles.reactCalendar}
            locate="pt-BR"
            formatDay={(locate, date) => format(date, "d", { locale: ptBR })}
            formatMonth={(locale, date) =>
               format(date, "MMMM yyyy", { locale: ptBR })
            }
         />
         <p>
            Data selecionada: {format(date, "dd MMMM yyyy", { locale: ptBR })}
         </p>
      </div>
   );
}
