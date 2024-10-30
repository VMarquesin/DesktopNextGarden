// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
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
//          dia_relato: "Hoje foi um dia difícil no trabalho. Hoje foi um dia difícil no trabalhoHoje foi um dia difícil no trabalho",
//          dia_data: "2024-09-15",
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
//             <ul>
//                {notas.length > 0 ? (
//                   notas.map((nota) => (
//                      <li
//                         key={nota.dia_id}
//                         onClick={() => setNotaSelecionada(nota)}
//                         className={styles.notaItem}
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
//                <div className={styles.notaDetalhada}>
//                   <header className={styles.notaHeader}>
//                      {paciente && paciente.foto && (
//                         <>
//                            {/* <Image
//                               src={paciente.foto}
//                               alt={paciente.usu_nome}
//                               width={50}
//                               height={50}
//                               className={styles.fotoPaciente}
//                            /> */}
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





"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import api from "../../../services/api";

export default function DiarioPaciente({ pacienteId }) {
   const [notas, setNotas] = useState([]); // Inicializa como array vazio
   const [notaSelecionada, setNotaSelecionada] = useState(null);
   const [paciente, setPaciente] = useState(null);

   // Chamada à API para buscar as notas do paciente
   useEffect(() => {
      async function fetchNotas() {
         try {
            const response = await api.get(`/diario/${pacienteId}`);
            console.log(response.data.dados); // Verifique os dados da API
            setNotas(response.data.dados || []); // Garante que sempre será um array
         } catch (error) {
            console.error("Erro ao buscar notas:", error);
            setNotas([]); // Caso ocorra erro, mantém como array vazio
         }
      }

      async function fetchPaciente() {
         try {
            const response = await api.get(`/pacientes`);
            console.log(response.data.dados); // Verifique os dados do paciente
            setPaciente(response.data.dados || null);
         } catch (error) {
            console.error("Erro ao buscar paciente:", error);
         }
      }

      fetchNotas();
      fetchPaciente();
   }, [pacienteId]);

   return (
      <div className={styles.container}>
         {/* Sidebar */}
         <aside className={styles.sidebar}>
            <h3>NOTAS DO DÍARIO</h3>
            <ul>
               {notas.length > 0 ? (
                  notas.map((nota) => (
                     <li
                        key={nota.dia_id}
                        onClick={() => setNotaSelecionada(nota)}
                        className={styles.notaItem}
                     >
                        <p>{nota.dia_relato.slice(0, 17)}...</p>
                        <p>
                           {new Date(nota.dia_data).toLocaleDateString("pt-BR")}
                        </p>
                     </li>
                  ))
               ) : (
                  <li>Selecione um paciente</li>
               )}
            </ul>
         </aside>

         {/* Área de visualização */}
         <section className={styles.visualizacaoNota}>
            {notaSelecionada ? (
               <div className={styles.notaDetalhada}>
                  <header className={styles.notaHeader}>
                     {paciente && paciente.foto && (
                        <>
                           <Image
                              src={paciente.foto}
                              alt={paciente.usu_nome}
                              width={50}
                              height={50}
                              className={styles.fotoPaciente}
                           />
                           <div className={styles.informacoesPaciente}>
                              <h2>{paciente.usu_nome}</h2>
                              <p>
                                 {new Date(
                                    notaSelecionada.dia_data
                                 ).toLocaleDateString()}
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
