"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";

import api from "../../services/api";
import { UserContext } from "../../../context/userContext";
// import { get } from "https";

export default function PacienteExercicios(pacienteId) {
   //armazenar lista de exercícios
   const [exercicios, setExercicios] = useState([]);
   //conteúdo criado do exercício
   const [conteudo, setConteudo] = useState("");
   //lista de pacientes
   const [pacientes, setPacientes] = useState([]);
   //pacientes selecionados
   const [pacientesSelecionados, setPacientesSelecionados] = useState([]);
   //visibilidade do modal
   const [showModal, setShowModal] = useState(false);
   //armazenar exercício selecionado
   const [selectedExercicio, setSelectedExercicio] = useState(null);
   //controlar visibilidade do modal exercício
   const [showModalExercicio, setShowModalExercicio] = useState(false);

   //buscando informações do psicologo
   const { psicologoInfo } = useContext(UserContext);

   // função para deletar exercícios
   async function fetchDeleteExercicios(ati_id) {
      try {
         await api.delete(`/atividade/${ati_id}`);
         setExercicios(
            (prevExercicios) =>
               prevExercicios.filter((exercicio) => exercicio.ati_id !== ati_id) //atualiza a lista após exclusão
         );
         setShowModalExercicio(false);
      } catch (error) {
         console.error("Houve um problema ao deletar o exercício:", error);
      }
   }

   //buscar pacientes associados ao psicólogo
   const get_pacientes = async (psi_id) => {
      const response = await api.get(`/paciente_psi_relacao/${psi_id}`);
      const dados = response.data.dados;

      console.log(dados);

      return dados;
   };

   //buscar as atividades
   useEffect(() => {
      async function fetchExercicios() {
         try {
            const response = await api.get("/atividade");
            setExercicios(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar atividades:", error);
         }
      }
      //buscar os pacientes
      async function fetchPacientes() {
         try {
            // const response = await api.get("/pacientes");
            // setPacientes(response.data.dados);
            const pacientes = await get_pacientes(psicologoInfo.psi_id);
            console.log(pacientes);
            setPacientes(pacientes);
         } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
         }
      }

      fetchExercicios();
      fetchPacientes();
   }, [pacienteId]); //muda se escolher ou paciente

   //modal detalhes do exercício
   const openModal = (exercicio) => {
      setSelectedExercicio(exercicio);
      setShowModalExercicio(true);
   };
   //limpando o modal
   const closeModal = () => {
      setShowModalExercicio(false);
      setSelectedExercicio(null);
   };
   //função para salvar o novo exercício
   const handleSalvarExercicio = async () => {
      try {
         const response = await api.post("/atividade", {
            ati_descricao: conteudo,
            ati_data: new Date().toISOString().split("T")[0],
            psi_id: psicologoInfo.psi_id,
         });

         const ati_id = response.data.dados;
         //enviar exercícios para os pacientes selecionados
         for (const pac_id of pacientesSelecionados) {
            await api.post("/atividade_paciente", {
               ati_id: ati_id,
               pac_id: pac_id,
            });
         }
         //atualiza a lista dos exercícios
         setExercicios([
            ...exercicios,
            {
               ati_id,
               ati_descricao: conteudo,
               ati_data: new Date().toISOString().split("T")[0],
            },
         ]);
         setConteudo("");
         setPacientesSelecionados([]);
         setShowModal(false);
      } catch (error) {
         console.error("Erro ao salvar exercício:", error);
      }
   };
   // seleção od paciente
   const togglePacienteSelecionado = (pac_id) => {
      if (pacientesSelecionados.includes(pac_id)) {
         //se estiver selecionado remove
         setPacientesSelecionados(
            pacientesSelecionados.filter((id) => id !== pac_id)
         );
      } else {
         //se não estiver adiciona
         setPacientesSelecionados([...pacientesSelecionados, pac_id]);
      }
   };

   return (
      <div className={styles.container}>
         {/* lista de atividades */}
         <aside className={styles.sidebar}>
            <h3>EXERCÍCIOS</h3>
            <ul className={styles.anotacoesLista}>
               {exercicios.length > 0 ? (
                  exercicios.map((exercicio) => (
                     <li
                        key={exercicio.ati_id}
                        onClick={() => openModal(exercicio)}
                     >
                        <p>
                           {exercicio?.ati_descricao?.slice(0, 22) ||
                              "Sem anotação"}
                        </p>
                        <strong>
                           {new Date(exercicio.ati_data).toLocaleDateString(
                              "pt-BR"
                           )}
                        </strong>
                     </li>
                  ))
               ) : (
                  <p>Nenhum exercício feito</p>
               )}
            </ul>
         </aside>
         {/* área de criação de atividades */}
         <main className={styles.mainContent}>
            <div className={styles.anotacao}>
               <header className={styles.header}>
                  <h2>Criar Novo Exercício</h2>
                  <p>
                     Adicione aqui as instruções ou tarefas para o paciente
                     realizar.
                  </p>
               </header>
               {/* escrever o conteúdo */}
               <textarea
                  placeholder="Escreva a Atividade aqui..."
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  className={styles.textoArea}
               />

               <div className={styles.criarBotoes}>
                  <button
                     className={styles.criarSalvarButton}
                     onClick={() => setShowModal(true)} //modal para selecionar os pacientes
                  >
                     Confirmar
                  </button>
                  <button
                     className={styles.criarCancelarButton}
                     onClick={() => setConteudo("")} //cancela e limpa o conteúdo
                  >
                     Cancelar
                  </button>
               </div>
            </div>
         </main>
         {/* modal para selecionar os pacientes */}
         {showModal && (
            <div className={styles.listaModal}>
               <div className={styles.listaModalContent}>
                  <h2>SELECIONE OS PACIENTES: </h2>
                  <ul className={styles.pacientesLista}>
                     {pacientes.length > 0 ? (
                        pacientes.map((paciente) => (
                           <li key={paciente.pac_id}>
                              <span>{paciente.usu_nome}</span>
                              <input
                                 type="checkbox"
                                 checked={pacientesSelecionados.includes(
                                    paciente.pac_id
                                 )}
                                 onChange={() =>
                                    togglePacienteSelecionado(paciente.pac_id)
                                 }
                              />
                           </li>
                        ))
                     ) : (
                        <li>Nenhum paciente disponível</li>
                     )}
                  </ul>
                  <div className={styles.modalBotoes}>
                     <button
                        className={styles.salvarButton}
                        onClick={handleSalvarExercicio}
                     >
                        Enviar Exercício
                     </button>
                     <button
                        className={styles.cancelarButton}
                        onClick={() => setShowModal(false)}
                     >
                        Cancelar
                     </button>
                  </div>
               </div>
            </div>
         )}
         {/* visualização do exercicio */}
         {showModalExercicio && (
            <div className={styles.modalOverlay}>
               <div className={styles.modalContent}>
                  <h3 className={styles.modalTitulo}>Detalhes do Exercício</h3>
                  <p className={styles.modalDescricao}>
                     {selectedExercicio?.ati_descricao}
                  </p>
                  <p className={styles.modalData}>
                     {new Date(selectedExercicio?.ati_data).toLocaleDateString(
                        "pt-BR"
                     )}
                  </p>
                  <div className={styles.listaBotoes}>
                     {/* botão de apagar exercício */}
                     <button
                        className={styles.listaApagarButton}
                        onClick={() =>
                           fetchDeleteExercicios(selectedExercicio.ati_id)
                        }
                     >
                        Apagar
                     </button>
                     <button
                        className={styles.listaCloseButton}
                        onClick={closeModal}
                     >
                        Fechar
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// import styles from "./index.module.css";
// // import api from "../../../services/api"; // Comentar a importação da API para o mock

// export default function PacienteExercicios(pacienteId) {
//    const [exercicios, setExercicios] = useState([
//       // Mock dos exercícios
//       {
//          ati_id: 1,
//          ati_descricao:
//             "Exercício de respiração asdfaasdsdasdfprofundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profunda Exercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaExercício de respiração profundaa",
//          ati_data: "2024-10-10",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 3,
//          ati_descricao: "Diário de emoções: Escreva sobre seu dia",
//          ati_data: "2024-10-15",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },

//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//       {
//          ati_id: 2,
//          ati_descricao: "Prática de meditação guiada",
//          ati_data: "2024-10-12",
//       },
//    ]);

//    const [conteudo, setConteudo] = useState("");
//    const [pacientes, setPacientes] = useState([]);
//    const [pacientesSelecionados, setPacientesSelecionados] = useState([]);
//    const [showModal, setShowModal] = useState(false);
//    const [selectedExercicio, setSelectedExercicio] = useState(null);
//    const [showModalExercicio, setShowModalExercicio] = useState(false);

//    const openModal = (exercicio) => {
//       setSelectedExercicio(exercicio);
//       setShowModalExercicio(true);
//    };

//    const closeModal = () => {
//       setShowModalExercicio(false);
//       setSelectedExercicio(null);
//    };

//    const handleSalvarExercicio = () => {
//       // Adicionando o exercício ao mock
//       const novoExercicio = {
//          ati_id: exercicios.length + 1,
//          ati_descricao: conteudo,
//          ati_data: new Date().toISOString().split("T")[0],
//       };

//       setExercicios([...exercicios, novoExercicio]);
//       setConteudo("");
//       setShowModal(false);
//    };

//    const togglePacienteSelecionado = (pac_id) => {
//       if (pacientesSelecionados.includes(pac_id)) {
//          setPacientesSelecionados(
//             pacientesSelecionados.filter((id) => id !== pac_id)
//          );
//       } else {
//          setPacientesSelecionados([...pacientesSelecionados, pac_id]);
//       }
//    };

//    const [files, setFiles] = useState([]);

//    const handleFileChange = (event) => {
//       const newFiles = Array.from(event.target.files);
//       setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//    };

//    const handleRemoveFile = (index) => {
//       setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//    };

//    return (
//       <div className={styles.container}>
//          <aside className={styles.sidebar}>
//             <h3>EXERCÍCIOS</h3>
//             <ul className={styles.anotacoesLista}>
//                {exercicios.length > 0 ? (
//                   exercicios.map((exercicio) => (
//                      <li
//                         key={exercicio.ati_id}
//                         onClick={() => openModal(exercicio)}
//                      >
//                         <p>{exercicio.ati_descricao.slice(0, 17)}...</p>
//                         <strong>
//                            {new Date(exercicio.ati_data).toLocaleDateString(
//                               "pt-BR"
//                            )}
//                         </strong>
//                      </li>
//                   ))
//                ) : (
//                   <p>Nenhum exercício feito</p>
//                )}
//             </ul>
//          </aside>
//          <main className={styles.mainContent}>
//             <div className={styles.anotacao}>
//                <header className={styles.header}>
//                   <h2>Criar Novo Exercício</h2>
//                   <p>
//                      Adicione aqui as instruções ou tarefas para o paciente
//                      realizar.
//                   </p>
//                </header>
//                <textarea
//                   placeholder="Escreva o exercício aqui..."
//                   value={conteudo}
//                   onChange={(e) => setConteudo(e.target.value)}
//                   className={styles.textoArea}
//                />

//                <div className={styles.criarBotoes}>
//                   <button
//                      className={styles.criarSalvarButton}
//                      onClick={() => setShowModal(true)}
//                   >
//                      Confirmar
//                   </button>
//                   <button
//                      className={styles.criarCancelarButton}
//                      onClick={() => setConteudo("")}
//                   >
//                      Cancelar
//                   </button>
//                </div>
//             </div>
//          </main>

//          {showModalExercicio && (
//             <div className={styles.modalOverlay}>
//                <div className={styles.modalContent}>
//                   <h3 className={styles.modalTitulo}>Detalhes do Exercício</h3>
//                   <p className={styles.modalDescricao}>
//                      {selectedExercicio?.ati_descricao}
//                   </p>
//                   <p className={styles.modalData}>
//                      {new Date(selectedExercicio?.ati_data).toLocaleDateString(
//                         "pt-BR"
//                      )}
//                   </p>
//                   <div className={styles.listaBotoes}>
//                      <button
//                         className={styles.listaApagarButton}
//                         onClick={() =>
//                            fetchDeleteExercicios(selectedExercicio.ati_id)
//                         }
//                      >
//                         Apagar
//                      </button>
//                      <button
//                         className={styles.listaCloseButton}
//                         onClick={closeModal}
//                      >
//                         Fechar
//                      </button>
//                   </div>
//                </div>
//             </div>
//          )}
//       </div>
//    );
// }
