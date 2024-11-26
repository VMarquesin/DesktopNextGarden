import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import api from "../../services/api";
import styles from "./index.module.css";

export default function DashboardPaciente({ pacienteId }) {
   // Armazena os dados das emoções
   const [dashboard, setDashboard] = useState([]);
   // Armazena as informações do paciente
   const [paciente, setPaciente] = useState(null);
   // Estado para controlar a visibilidade do modal
   const [modalVisivel, setModalVisivel] = useState(false);

   useEffect(() => {
      // Busca das emoções do paciente
      async function fetchDashboard() {
         try {
            const response = await api.get(`/emocao_paciente/${pacienteId.pac_id}`);
            setDashboard(response.data.dados || []);
         } catch (error) {
            console.error("Erro ao buscar dados de emoções:", error);
            setDashboard([]);
         }
      }

      // Busca dos pacientes
      async function fetchPaciente() {
         try {
            const response = await api.get(`/pacientes`);
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

   // Configurações do gráfico
   const options = {
      title: "Gráfico de Emoções",
      subtitle: "Acompanhe as emoções diárias",
      hAxis: { title: "Data" },
      vAxis: { title: "Nível de Emoção" },
      curveType: "function",
      legend: { position: "bottom" },
   };

   // Função para abrir o modal
   const openModal = () => {
      setModalVisivel(true);
   };

   // Função para fechar o modal
   const closeModal = () => {
      setModalVisivel(false);
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

         {/* Ícone de ajuda para abrir o modal */}
         <button onClick={openModal} className={styles.helpIcon}>
            🛈
         </button>

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

         {/* Modal com a legenda explicativa */}
         {modalVisivel && (
            <div className={styles.modal}>
               <div className={styles.modalContent}>
              
                  
                  <ul>
                     <li><strong>Eixo Horizontal (Data):</strong> Representa os dias em que o paciente registrou suas emoções.</li>
                     <br />
                     <li><strong>Eixo Vertical (Nível de Emoção):</strong> Indica a intensidade emocional associada a cada registro, conforme o mapeamento abaixo:</li>
                  </ul>
                  <br />
                  <ul>
                     <li><strong>6:</strong> Muito Feliz 🟢</li>
                     <li><strong>5:</strong> Feliz 🟡</li>
                     <li><strong>4:</strong> Neutro ⚪</li>
                     <li><strong>3:</strong> Triste 🟠</li>
                     <li><strong>2:</strong> Muito Triste 🔴</li>
                     <li><strong>1:</strong> Raiva 🔥</li>
                  </ul>
                  <br />
                  <p><strong>Atenção:</strong> Considere este gráfico como um suporte para análise. Converse com o paciente para entender os contextos das emoções registradas.</p>
                      {/* Botão de fechar */}
                      <button className={styles.closeButton} onClick={closeModal}>
                     Fechar
                  </button>
               </div>
               
            </div>
         )}
      </div>
   );
}
