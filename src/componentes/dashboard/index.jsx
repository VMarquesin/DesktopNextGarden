import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

import api from "../../services/api";
import styles from "./index.module.css";

export default function DashboardPaciente({ pacienteId }) {
   //armazena os dados das emoções
   const [dashboard, setDashboard] = useState([]);
   //armazena as informações do paciente
   const [paciente, setPaciente] = useState(null);

   useEffect(() => {
      //busca das emoções do paciente
      async function fetchDashboard() {
         try {
            const response = await api.get(
               `/emocao_paciente/${pacienteId.pac_id}`
            );
            console.log("Dados da API:", response.data.dados); // Debug
            setDashboard(response.data.dados || []);
         } catch (error) {
            console.error("Erro ao buscar dados de emoções:", error);
            setDashboard([]);
         }
      }
      // busca dos pacientes
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
   //configurações do grafico
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