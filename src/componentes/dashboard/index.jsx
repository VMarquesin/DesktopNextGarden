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

export default function GraficoEmocoes({ pac_id: initialPacId }) {
   const [dadosEmocoes, setDadosEmocoes] = useState(null); 
   const [loading, setLoading] = useState(true);
   const [data_inicial, setDataInicial] = useState("");
   const [data_final, setDataFinal] = useState("");
   const [pac_id, setPacienteId] = useState(initialPacId); // Aqui definimos o pac_id com o valor inicial

   useEffect(() => {
      async function fetchEmocoes() {
         try {
            const dados = { 
                     emo_data_inicial: data_inicial, 
                     emo_data_final: data_final, 
                     pac_id: pac_id
                  };
            const response = await api.get("/emocao_paciente_periodo", { params: dados }); // Usando params para passar os dados para o GET

            if (response.data.sucesso === true) {
               const emocao_paciente = response.data.dados;
               const emocao_paciente_periodo = {
                  emo_id: emocao_paciente.emo_id,
                  emo_descricao: emocao_paciente.emo_descricao,
                  emo_data: emocao_paciente.emo_data,
                  total: emocao_paciente.Total,
               };
               setDadosEmocoes(response.data);
               setLoading(false);
               localStorage.clear();
               localStorage.setItem("emocao_paciente", JSON.stringify(emocao_paciente_periodo));
            } else {
               alert("Erro: " + response.data.mensagem);
            }
         } catch (error) {
            console.error("Erro ao buscar emoções:", error);
            setLoading(false);
         }
      }

      if (pac_id) {
         fetchEmocoes();
      }
   }, [pac_id, data_inicial, data_final]); // A dependência pac_id agora pode ser alterada sem erro

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
