"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";

import api from "../../services/api";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

export default function GraficoEmocoes({ pac_id }) {
   const [dadosEmocoes, setDadosEmocoes] = useState(null); 
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchEmocoes() {
         try {
            const response = await api.get(`/emocao_paciente/${pac_id}`); 
            setDadosEmocoes(response.data);
            setLoading(false);
         } catch (error) {
            console.error("Erro ao buscar emoções:", error);
            setLoading(false);
         }
      }

      fetchEmocoes();
   }, [pac_id]);

   // Dados para o gráfico
   const data = {
      labels: [
         "Muito Feliz",
         "Feliz",
         "Neutro",
         "Triste",
         "Muito Triste",
         "Raiva",
      ], // Labels das emoções
      datasets: [
         {
            label: "Emoções do Paciente",
            data: dadosEmocoes
               ? [
                    dadosEmocoes.muito_feliz || 0,
                    dadosEmocoes.feliz || 0,
                    dadosEmocoes.neutro || 0,
                    dadosEmocoes.triste || 0,
                    dadosEmocoes.muito_triste || 0,
                    dadosEmocoes.raiva || 0,
                 ]
               : [0, 0, 0, 0, 0, 0],
            backgroundColor: [
               "#4CAF50",
               "#8BC34A",
               "#FFC107",
               "#FF9800",
               "#F44336",
               "#9C27B0",
            ],
            borderWidth: 1,
         },
      ],
   };

   const options = {
      responsive: true,
      plugins: {
         legend: {
            display: true,
            position: "top",
         },
         title: {
            display: true,
            text: "Gráfico de Emoções",
         },
      },
   };

   return (
      <div>
         {loading ? (
            <p>Carregando...</p>
         ) : (
            <Bar data={data} options={options} />
         )}
      </div>
   );
}
