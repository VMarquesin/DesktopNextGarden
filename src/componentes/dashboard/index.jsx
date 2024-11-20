// "use client";

// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";

// import {
//    Chart as ChartJS,
//    CategoryScale,
//    LinearScale,
//    BarElement,
//    Title,
//    Tooltip,
//    Legend,
// } from "chart.js";

// import api from "../../services/api";

// ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    BarElement,
//    Title,
//    Tooltip,
//    Legend
// );

// export default function GraficoEmocoes({ pac_id: initialPacId }) {
//    const [dadosEmocoes, setDadosEmocoes] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const [data_inicial, setDataInicial] = useState("");
//    const [data_final, setDataFinal] = useState("");
//    const [pac_id, setPacienteId] = useState(initialPacId); // Aqui definimos o pac_id com o valor inicial

//    useEffect(() => {
//       async function fetchEmocoes() {
//          try {
//             const dados = {
//                      emo_data_inicial: data_inicial,
//                      emo_data_final: data_final,
//                      pac_id: pac_id
//                   };
//             const response = await api.get("/emocao_paciente_periodo", { params: dados }); // Usando params para passar os dados para o GET

//             if (response.data.sucesso === true) {
//                const emocao_paciente = response.data.dados;
//                const emocao_paciente_periodo = {
//                   emo_id: emocao_paciente.emo_id,
//                   emo_descricao: emocao_paciente.emo_descricao,
//                   emo_data: emocao_paciente.emo_data,
//                   total: emocao_paciente.Total,
//                };
//                setDadosEmocoes(response.data);
//                setLoading(false);
//                localStorage.clear();
//                localStorage.setItem("emocao_paciente", JSON.stringify(emocao_paciente_periodo));
//             } else {
//                alert("Erro: " + response.data.mensagem);
//             }
//          } catch (error) {
//             console.error("Erro ao buscar emoções:", error);
//             setLoading(false);
//          }
//       }

//       if (pac_id) {
//          fetchEmocoes();
//       }
//    }, [pac_id, data_inicial, data_final]); // A dependência pac_id agora pode ser alterada sem erro

//    // Dados para o gráfico
//    const data = {
//       labels: [
//          "Muito Feliz",
//          "Feliz",
//          "Neutro",
//          "Triste",
//          "Muito Triste",
//          "Raiva",
//       ], // Labels das emoções
//       datasets: [
//          {
//             label: "Emoções do Paciente",
//             data: dadosEmocoes
//                ? [
//                     dadosEmocoes.muito_feliz || 0,
//                     dadosEmocoes.feliz || 0,
//                     dadosEmocoes.neutro || 0,
//                     dadosEmocoes.triste || 0,
//                     dadosEmocoes.muito_triste || 0,
//                     dadosEmocoes.raiva || 0,
//                  ]
//                : [0, 0, 0, 0, 0, 0],
//             backgroundColor: [
//                "#4CAF50",
//                "#8BC34A",
//                "#FFC107",
//                "#FF9800",
//                "#F44336",
//                "#9C27B0",
//             ],
//             borderWidth: 1,
//          },
//       ],
//    };

//    const options = {
//       responsive: true,
//       plugins: {
//          legend: {
//             display: true,
//             position: "top",
//          },
//          title: {
//             display: true,
//             text: "Gráfico de Emoções",
//          },
//       },
//    };

//    return (
//       <div>
//          {loading ? (
//             <p>Carregando...</p>
//          ) : (
//             <Bar data={data} options={options} />
//          )}
//       </div>
//    );
// }

// import { useState, useEffect } from "react";
// import { Chart } from "react-google-charts";
// import api from "../../services/api";

// export default function DashboardPaciente({ pacienteId }) {
//    const [dashboard, setDashboard] = useState([]);
//    const [paciente, setPaciente] = useState(null);

//    useEffect(() => {
//       async function fetchDashboard() {
//          try {
//             const response = await api.get(`/emocao_paciente/${pacienteId}`);
//             console.log(response.data.dados);
//             setDashboard;
//          } catch (error) {
//             console.error("Erro ao buscar notas:", error);
//             setDashboard([]);
//          }
//       }
//       async function fetchPaciente() {
//          try {
//             const response = await api.get(`/pacientes`);
//             console.log(response.data.dados);
//             setPaciente(response.data.dados || null);
//          } catch (error) {
//             console.error("Erro ao buscar paciente:", error);
//             setPaciente(null);
//          }
//       }
//       fetchDashboard();
//       fetchPaciente();
//    }, [pacienteId]);

//    const dadosTemp = [
//       {
//          emo_id: 14,
//          emo_descricao: "Muito feliz",
//       },
//       {
//          emo_id: 15,
//          emo_descricao: "Feliz",
//       },
//       {
//          emo_id: 16,
//          emo_descricao: "Neutro",
//       },
//       {
//          emo_id: 17,
//          emo_descricao: "Triste",
//       },
//       {
//          emo_id: 18,
//          emo_descricao: "Muito triste",
//       },
//       {
//          emo_id: 19,
//          emo_descricao: "Raiva",
//       },
//    ];

//    const [emocoes, setEmocoes] = useState([]);

//    const data = [
//       ["Dia", "Emoção"],
//       ["1", 1],
//       ["2", 2],
//       ["3", 4],
//       ["4", 6],
//    ];

//    //    const formattedData = [
//    //       ["Dia", "Emoção"],
//    //       ...dashboard.map((item) => [item.data, item.emo_id]), // Exemplo de transformação
//    //    ];

//    const options = {
//       chart: {
//          title: "Gráfico de Emoções",
//          subtitle: "Acompanhe as emoções diárias",
//       },
//    };

//    return (
//       <div>
//          {/* <h1>Dashboard do Paciente</h1>
//          {paciente ? (
//             <div>
//                <h2>Paciente: {paciente.nome}</h2>
//             </div>
//          ) : (
//             <p>Carregando informações do paciente...</p>
//          )} */}
//          {dashboard.length > 0 ? (
//             <Chart
//                chartType="Line"
//                width="100%"
//                height="400px"
//                data={formattedData}
//                options={options}
//             />
//          ) : (
//             <p>Carregando dados do gráfico...</p>
//          )}
//       </div>
//    );
// }
import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import api from "../../services/api";
import styles from "./index.module.css"

export default function DashboardPaciente({ pacienteId }) {
   const [dashboard, setDashboard] = useState([]);
   const [paciente, setPaciente] = useState(null);

   useEffect(() => {
      async function fetchDashboard() {
         try {
            const response = await api.get(
               `/emocao_paciente/${pacienteId.pac_id}`
            );
            console.log("Dados da API:", response.data.dados); // Debug
            setDashboard(response.data.dados || []); // Salvar os dados no estado
         } catch (error) {
            console.error("Erro ao buscar dados de emoções:", error);
            setDashboard([]);
         }
      }

      console.log(pacienteId);

      async function fetchPaciente() {
         try {
            const response = await api.get(`/pacientes`);
            console.log("Paciente:", response.data.dados); // Debug
            setPaciente(response.data.dados || null);
         } catch (error) {
            console.error("Erro ao buscar paciente:", error);
            setPaciente(null);
         }
      }

      fetchDashboard();
      fetchPaciente();
   }, [pacienteId]);

   // Mapeamento de emoções para números
   const emocaoMap = {
      "Muito feliz": 6,
      Feliz: 5,
      Neutro: 4,
      Triste: 3,
      "Muito triste": 2,
      Raiva: 1,
   };

   // Formatar dados para Google Charts
   const formattedData = [
      ["Data", "Emoção"], 
      ...dashboard.map((item) => [
         new Date(item.emo_data).toLocaleDateString("pt-BR"), // Formatando data
         emocaoMap[item.emo_descricao] || 0, // Mapeando emoções para números
      ]),
   ];

   const options = {
      title: "Gráfico de Emoções",
      subtitle: "Acompanhe as emoções diárias",
      hAxis: { title: "Data" },
      vAxis: { title: "Nível de Emoção" },
      curveType: "function",
      legend: { position: "bottom" },
   };

   return (
      <div className={styles.grafico}>
         <h1>Dashboard do Paciente</h1>
         {paciente ? (
            <div>
               <h2>Paciente: {paciente.nome}</h2>
            </div>
         ) : (
            <p>Carregando informações do paciente...</p>
         )}
         {dashboard.length > 0 ? (
            <Chart
               chartType="LineChart"
               width="100%"
               height="100%"
               data={formattedData}
               options={options}
            />
         ) : (
            <p>Carregando dados do gráfico...</p>
         )}
      </div>
   );
}
