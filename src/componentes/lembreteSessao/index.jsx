"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./index.module.css";
import api from "../../services/api";

export default function Calendario({ pacienteId }) {
   const [eventos, setEventos] = useState([]);

   useEffect(() => {
      async function fetchEvents() {
         try {
            const response = await api.get("/data_sessao");
            const data = response.data;

            console.log("Eventos recebidos da API:", data);

            setEventos(
               data.map((evento) => ({
                  id: evento.dse_id,
                  psi_id: evento.psi_id,
                  pac_id: evento.pac_id,
                  date: new Date(evento.dse_sessao_data)
                     .toISOString()
                     .split("T")[0], // Garantindo que a data seja formatada
               }))
            );
         } catch (error) {
            console.error("Erro ao buscar eventos:", error);
         }
      }

      fetchEvents();
   }, []);

   const handleDateClick = async (info) => {
      const psi_id = 1; // Substitua conforme necessário
      const dse_sessao_data = new Date(info.dateStr)
         .toISOString()
         .split("T")[0];

      console.log("Data clicada:", dse_sessao_data);
      console.log("Paciente ID:", pacienteId);

      // Logando os eventos atuais para depuração
      console.log("Eventos atuais no estado:", eventos);

      // Verificar se já existe uma sessão para esta data e paciente
      const eventoExistente = eventos.find(
         (evento) =>
            evento.date === dse_sessao_data && evento.pac_id === pacienteId
      );

      console.log("Evento existente encontrado:", eventoExistente);

      if (eventoExistente) {
         try {
            console.log(
               "ID do evento existente a ser removido:",
               eventoExistente.id
            );
            const response = await api.delete(
               `/data_sessao/${eventoExistente.id}`
            );
            const data = response.data;

            if (data.sucesso) {
               setEventos(
                  eventos.filter((evento) => evento.id !== eventoExistente.id)
               );
               alert("Sessão removida com sucesso!");
            } else {
               alert("Erro ao remover a sessão: " + data.mensagem);
            }
         } catch (error) {
            console.error("Erro na requisição de remoção:", error.message);
            alert("Erro na requisição de remoção: " + error.message);
         }
      } else {
         try {
            const response = await api.post("/data_sessao", {
               psi_id: psi_id,
               pac_id: pacienteId,
               data_sessao: dse_sessao_data,
            });

            const data = response.data;

            console.log("Resposta da API ao cadastrar sessão:", data);

            if (data.sucesso && data.dados) {
               setEventos((prevEventos) => [
                  ...prevEventos,
                  {
                     id: data.dados, // Usar o ID retornado do back-end
                     title: `Sessão com Paciente ${pacienteId}`,
                     date: dse_sessao_data,
                  },
               ]);
               alert("Data da sessão cadastrada com sucesso!");
            } else {
               alert(
                  "Erro ao cadastrar data da sessão: " +
                     (data.mensagem || "Erro desconhecido.")
               );
            }
         } catch (error) {
            console.error("Erro na requisição de cadastro:", error.message);
            alert("Erro na requisição de cadastro: " + error.message);
         }
      }
   };

   return (
      <div className={styles.container}>
         <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={eventos}
            dateClick={handleDateClick}
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
