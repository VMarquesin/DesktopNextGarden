"use client";

import { useState, useEffect } from "react";
import styles from "./index.module.css";
import api from "../../services/api";

export default function DiarioPaciente({ pacienteId }) {
   //armazena as notas do diário
   const [notas, setNotas] = useState([]);
   //nota clicada na interface
   const [notaSelecionada, setNotaSelecionada] = useState(null);
   //informações do paciente
   const [paciente, setPaciente] = useState(null);

   //buscar as notas do paciente
   useEffect(() => {
      //busca de diarios do paciente
      async function fetchNotas() {
         try {
            const response = await api.get(`/diario/${pacienteId}`);
            console.log(response.data.dados);
            setNotas(response.data.dados || []);
         } catch (error) {
            console.error("Erro ao buscar notas:", error);
            setNotas([]);
         }
      }
      //informações do paciente
      async function fetchPaciente() {
         try {
            const response = await api.get(`/pacientes`);
            console.log(response.data.dados);
            setPaciente(response.data.dados || null);
         } catch (error) {
            console.error("Erro ao buscar paciente:", error);
         }
      }

      fetchNotas();
      fetchPaciente();
   }, [pacienteId]); //chamado toda vez que pacienteId mudar

   return (
      <div className={styles.container}>
         {/* lista das notas do diário */}
         <aside className={styles.sidebar}>
            <h3>NOTAS DO DIÁRIO</h3>
            <ul className={styles.diarioLista}>
               {notas.length > 0 ? (
                  notas.map((nota) => (
                     <li
                        key={nota.dia_id}
                        onClick={() => setNotaSelecionada(nota)}
                        className={
                           notaSelecionada?.dia_id === nota.dia_id
                              ? styles.activeDiario
                              : " "
                        }
                     >
                        <p>{nota.dia_relato.slice(0, 17)}...</p>
                        <p>
                           {new Date(nota.dia_data).toLocaleDateString("pt-BR")}
                        </p>
                     </li>
                  ))
               ) : (
                  <p>Selecione um paciente</p>
               )}
            </ul>
         </aside>

         {/* Área de visualização */}
         <section className={styles.visualizacaoNota}>
            {notaSelecionada ? (
               <div className={styles.notaDetalhada}>
                  <header className={styles.notaHeader}>
                     {paciente && (
                        <>
                           <div className={styles.informacoesPaciente}>
                              {/* <h2>{usuario.usu_nome}</h2> */}
                              <p>
                                 {new Date(
                                    notaSelecionada.dia_data
                                 ).toLocaleDateString("pt-BR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                 })}
                              </p>
                           </div>
                        </>
                     )}
                  </header>
                  <div className={styles.conteudoNota}>
                     {notaSelecionada.dia_relato ? (
                        <p>{notaSelecionada.dia_relato}</p>
                     ) : (
                        <p>Sem conteúdo disponível para esta nota.</p>
                     )}
                  </div>
               </div>
            ) : (
               <p className={styles.avisoNota}>
                  Selecione uma nota para visualizar
               </p>
            )}
         </section>
      </div>
   );
}

// "use client";

// import { useState, useEffect } from "react";
// import styles from "./index.module.css";
// // import api from "../../../services/api"; // Comentado pois não vamos utilizar a API real

// export default function DiarioPaciente({ pacienteId }) {
//    const [notas, setNotas] = useState([]); // Inicializa como array vazio
//    const [notaSelecionada, setNotaSelecionada] = useState(null);
//    const [paciente, setPaciente] = useState(null);

//    // Mock de dados para as notas e paciente
//    const mockNotas = [
//       {
//          dia_id: 1,
//          dia_relato:
//             "Hoje foi um dia difoje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no tHoje foi um dia difícil no oje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no toje foi um dia difHoje foi um dia difícil no t trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um ícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um Hoje foi um dia difícil no trabalho. Hoje foi um dia difícil no trabalhoHoje foi um dia difícil no trabalho",
//          dia_data: "2024-09-15",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },

//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },

//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },
//       {
//          dia_id: 2,
//          dia_relato: "Me senti mais animado após a sessão de terapia.",
//          dia_data: "2024-09-16",
//       },

//       {
//          dia_id: 3,
//          dia_relato: "Fiz uma caminhada no parque e foi relaxante.",
//          dia_data: "2024-09-17",
//       },
//    ];

//    const mockPaciente = {
//       usu_nome: "João Silva",
//       foto: "/profileDefault.jpg", // Caminho para uma imagem de perfil padrão
//    };

//    // Mock do fetch para popular os dados de notas e paciente
//    useEffect(() => {
//       // Simulando a chamada para buscar as notas
//       function fetchNotas() {
//          setNotas(mockNotas);
//       }

//       // Simulando a chamada para buscar o paciente
//       function fetchPaciente() {
//          setPaciente(mockPaciente);
//       }

//       fetchNotas();
//       fetchPaciente();
//    }, [pacienteId]);

//    return (
//       <div className={styles.container}>
//          {/* Sidebar */}
//          <aside className={styles.sidebar}>
//             <h3>NOTAS DO DIÁRIO</h3>
//             <ul className={styles.diarioLista}>
//                {notas.length > 0 ? (
//                   notas.map((nota) => (
//                      <li
//                         key={nota.dia_id}
//                         onClick={() => setNotaSelecionada(nota)}
//                         className={notaSelecionada?.dia_id === nota.dia_id ? styles.activeDiario : " "}
//                         // className={styles.notaItem}
//                      >
//                         <p>{nota.dia_relato.slice(0, 17)}...</p>
//                         <p>
//                            {new Date(nota.dia_data).toLocaleDateString("pt-BR")}
//                         </p>
//                      </li>
//                   ))
//                ) : (
//                   <li>Selecione um paciente</li>
//                )}
//             </ul>
//          </aside>

//          {/* Área de visualização */}
//          <section className={styles.visualizacaoNota}>
//             {notaSelecionada ? (
//                // <div className={styles.teste}>
//                <div className={styles.notaDetalhada}>
//                   <header className={styles.notaHeader}>
//                      {paciente && paciente.foto && (
//                         <>
//                            <div className={styles.informacoesPaciente}>
//                               <h2>{paciente.usu_nome}</h2>
//                               <p>
//                                  {new Date(
//                                     notaSelecionada.dia_data
//                                  ).toLocaleDateString("pt-BR")}
//                               </p>
//                            </div>
//                         </>
//                      )}
//                   </header>
//                   <div className={styles.conteudoNota}>
//                      {notaSelecionada.dia_relato ? (
//                         <p>{notaSelecionada.dia_relato}</p>
//                      ) : (
//                         <p>Sem conteúdo disponível para esta nota.</p>
//                      )}
//                      {/* </div> */}
//                   </div>
//                </div>
//             ) : (
//                <p className={styles.avisoNota}>
//                   Selecione uma nota para visualizar
//                </p>
//             )}
//          </section>
//       </div>
//    );
// }
