"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; 

import dayGridPlugin from "@fullcalendar/daygrid"; 
import interactionPlugin from "@fullcalendar/interaction"; 

import styles from "./index.module.css";
import api from "../../../services/api";

export default function Calendario({ pacienteId }) {
   const [eventos, setEventos] = useState([]);

   const handleDateClick = async (info) => {
      
      const psi_id = 1; 
      const dse_sessao_data = info.dateStr; 

      try {
         const response = await api.post("/data_sessao", {
               psi_id: psi_id,
               pac_id: pacienteId,
               data_sessao: dse_sessao_data,
         });

         const data = response.data;

         if (data.sucesso) {
            setEventos((prevEventos) => [
               ...prevEventos, 
               { title: `Sessão com Paciente ${pacienteId}`, date: dse_sessao_data }
            ]);
            alert("Data da sessão cadastrada com sucesso!");
         } else {
            alert("Erro ao cadastrar data da sessão: " + data.mensagem);
         }
      } catch (error) {
         alert("Erro na requisição: " + error.message);
      }
   };

   return (
      <div className={styles.container}>
         <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]} // Adiciona o plugin de interação
            initialView="dayGridMonth"
            events={eventos}
            dateClick={handleDateClick} // Evento para capturar clique na data
            headerToolbar={{
               left: "prev,next today",
               center: "title",
               right: "dayGridMonth,dayGridWeek",
            }}
            locale="pt-br"
            buttonText={{
               today: "Hoje",
               month: "Mês",
               week: "Semana",
            }}
         />
      </div>
   );
}
