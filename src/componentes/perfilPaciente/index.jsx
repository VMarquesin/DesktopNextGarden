"use client";

import { useState, useEffect } from "react";
import styles from "./index.module.css";
import api from "../../services/api";

export default function PacientePerfil({ paciente }) {
   //texto da nota
   const [nota, setNota] = useState("");
   //mensagem save nota
   const [statusMensagem, setStatusMensagem] = useState("");
   //informações do paciente
   const [usuario, setUsuario] = useState(null);
   //exibição do componente
   const [visivel, setVisivel] = useState(true);

   //requisição das informações do paciente
   useEffect(() => {
      async function fetchUsuario() {
         try {
            const response = await api.get(`/usuarios/${paciente.usu_id}`);
            setUsuario(response.data.dados);
         } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
         }
      }
      // só executa a busca se paciente.usu_id estiver definido
      if (paciente.usu_id) {
         fetchUsuario();
      }
   }, [paciente.usu_id]);

   // atualiza o estado nota
   const handleNoteChange = (e) => {
      setNota(e.target.value);
   };

   //post da nota feita pelo psi no perfil do pac
   const handleSaveNote = async () => {
      try {
         const response = await api.post("/psi_anotacao", {
            pacienteId: paciente.pac_id,
            conteudo: nota,
         });
         setStatusMensagem("Nota salva com sucesso!");
         setNota("");
      } catch (error) {
         setStatusMensagem("Erro ao salvar a nota.");
         console.error("Erro ao salvar a nota:", error);
      }
   };

   // Fecha o componente
   const handleClose = () => {
      setVisivel(false);
   };

   if (!visivel) return null; // Retorna null se o componente estiver fechado

   return (
      <div className={styles.refContainer}>
         <div className={styles.perfilContainer}>
            {/* Botão de fechar */}
            <button className={styles.closeButton} onClick={handleClose}>
               &times;
            </button>
            {/* dados do paciente */}
            <div className={styles.containerNome}>
               <div className={styles.nome}>
                  {usuario ? (
                     <>
                        <h2>{paciente.usu_nome}</h2>
                        <h3>{paciente.usu_nick}</h3>
                     </>
                  ) : (
                     <p>Carregando informações do paciente...</p>
                  )}
               </div>
            </div>
            <div className={styles.atributos}>
               <p>Telefone: {paciente.pac_telefone}</p>
               <p>Data de Nascimento: {paciente.pac_data_nasc}</p>
               <p>CPF: {paciente.pac_cpf}</p>
               <p>Filhos: {paciente.pac_filho}</p>
               <p>Escolaridade: {paciente.pac_escolaridade}</p>
               <p>Trabalho: {paciente.pac_trabalho}</p>
               <p>Estado Civil: {paciente.pac_estado_civil}</p>
            </div>

            {/* campo nota */}
            <div className={styles.containerNotaSave}>
               {/* atualiza o estado */}
               <textarea
                  placeholder="Adicionar nota..."
                  value={nota}
                  onChange={handleNoteChange}
                  className={styles.notaTextarea}
               />
               <div className={styles.containerButton}>
                  {/* salvar a nota */}
                  <button
                     onClick={handleSaveNote}
                     className={styles.saveButton}
                  >
                     Salvar Nota
                  </button>
               </div>
            </div>
            {statusMensagem && (
               <p className={styles.statusMensagem}>{statusMensagem}</p>
            )}
         </div>
      </div>
   );
}

// "use client";

// import { useState, useContext, useEffect, useRef } from "react";
// import styles from "./index.module.css";
// import { UserContext } from "../../../context/userContext";

// export default function PacientePerfil({ paciente, onClose }) {
//    const [nota, setNota] = useState("");
//    const [statusMensagem, setStatusMensagem] = useState("");
//    const { psicologoInfo } = useContext(UserContext);
//    const containerRef = useRef(null); // Referência ao contêiner do perfil

//    // Usa o mock se `paciente` for undefined ou null
//    const pacienteAtual = paciente || {
//       pac_id: 1,
//       usu_nome: "João da Silva",
//       usu_nick: "joao123",
//       pac_telefone: "(11) 99999-8888",
//       pac_data_nasc: "1990-05-15",
//       pac_cpf: "123.456.789-00",
//       pac_filho: "2",
//       pac_escolaridade: "Ensino Superior Completo",
//       pac_trabalho: "Analista de Sistemas",
//       pac_estado_civil: "Casado",
//    };

//    const handleNoteChange = (e) => {
//       setNota(e.target.value);
//    };

//    const handleSaveNote = async () => {
//       try {
//          console.log("Nota salva no mock:", {
//             psi_id: psicologoInfo?.psi_id || 1, // ID mockado do psicólogo
//             pan_anotacao: nota,
//             pan_anotacao_data: new Date().toISOString().split("T")[0],
//             pac_id: pacienteAtual.pac_id,
//          });
//          setStatusMensagem("Nota salva com sucesso (mock)!");
//          setNota("");
//       } catch (error) {
//          setStatusMensagem("Erro ao salvar a nota.");
//          console.error("Erro ao salvar a nota:", error);
//       }
//    };

//    // Fecha o modal ao clicar fora do contêiner
//    useEffect(() => {
//       const handleOutsideClick = (event) => {
//          if (
//             containerRef.current &&
//             !containerRef.current.contains(event.target)
//          ) {
//             onClose(); // Chama a função de fechamento passada como prop
//          }
//       };

//       document.addEventListener("mousedown", handleOutsideClick);

//       return () => {
//          document.removeEventListener("mousedown", handleOutsideClick);
//       };
//    }, [onClose]);

//    return (
//       <div className={styles.refContainer}>
//          <div className={styles.perfilContainer} ref={containerRef}>
//             <div className={styles.containerNome}>
//                <div className={styles.nome}>
//                   <>
//                      <h2>{pacienteAtual.usu_nome}</h2> {/* Nome do usuário */}
//                      <h3>{pacienteAtual.usu_nick}</h3>{" "}
//                      {/* Nickname do usuário */}
//                   </>
//                </div>
//             </div>

//             <div className={styles.atributos}>
//                {/* Atributos do paciente */}
//                <p>Telefone: {"(11) 99999-8888"}</p>
//                <p>Data de Nascimento: {"1990-05-15"}</p>
//                <p>CPF: {"123.456.789-00"}</p>
//                <p>Filhos: {"2"}</p>
//                <p>Escolaridade: {"Ensino Superior Completo"}</p>
//                <p>Trabalho: {"Analista de Sistemas"}</p>
//                <p>Estado Civil: {"Casado"}</p>
//             </div>

//             <div className={styles.containerNotaSave}>
//                <textarea
//                   placeholder="Adicionar nota..."
//                   value={nota}
//                   onChange={handleNoteChange}
//                   className={styles.notaTextarea}
//                />
//                <div className={styles.containerButton}>
//                   <button
//                      onClick={handleSaveNote}
//                      className={styles.saveButton}
//                   >
//                      Salvar Nota
//                   </button>
//                </div>
//             </div>

//             {statusMensagem && (
//                <p className={styles.statusMensagem}>{statusMensagem}</p>
//             )}
//          </div>
//       </div>
//    );
// }

// "use client";

// import { useState, useEffect, useContext } from "react";
// import styles from "./index.module.css";

// import api from "../../services/api";
// import { UserContext } from "../../../context/userContext";

// export default function PacientePerfil({ paciente, onSaveNote }) {
//    const [nota, setNota] = useState("");
//    const [statusMensagem, setStatusMensagem] = useState("");
//    const [usuario, setUsuario] = useState(null);
//    const { psicologoInfo } = useContext (UserContext);

//    const handleNoteChange = (e) => {
//       setNota(e.target.value);
//    };

//    useEffect(() => {
//       async function fetchUsuario() {
//          try {
//             console.log("ID do usuário:", usuario.usu_id);
//             const response = await api.get(`/usuarios/${usuario.usu_id}`);
//             console.log("Resposta da API para o usuário:", response.data);

//             if (response.data && response.data.dados) {
//                setUsuario(response.data.dados);
//             } else {
//                console.error("Dados do usuário não encontrados na resposta.");
//             }
//          } catch (error) {
//             console.error(
//                "Erro ao buscar o usuário:",
//                error.response ? error.response.data : error.message
//             );
//          }
//       }

//       fetchUsuario();
//    }, []);

//    const handleSaveNote = async () => {
//       try {
//          const response = await api.post("/psi_anotacao", {
//             psi_id: psicologoInfo.psi_id,
//             pan_anotacao: nota,
//             pan_anotacao_data:"1964-02-16",
//             pac_id: paciente.pac_id
//          });
//          setStatusMensagem("Nota salva com sucesso!");
//          setNota("");
//       } catch (error) {
//          setStatusMensagem("Erro ao salvar a nota.");
//          console.error("Erro ao salvar a nota:", error);
//       }
//    };

//    return (
//       <div className={styles.refContainer}>
//          <div className={styles.perfilContainer}>
//             <div className={styles.containerNome}>
//                {/* Imagem e informações do paciente */}
//                <div className={styles.nome}>
//                   {paciente ? (
//                      <>
//                         <h2>{paciente.usu_nome}</h2> {/* Nome do usuário */}
//                         <h3>{paciente.usu_nick}</h3> {/* Nickname do usuário */}
//                      </>
//                   ) : (
//                      <p>Carregando informações do paciente...</p>
//                   )}
//                </div>
//             </div>

//             <div className={styles.atributos}>
//                {/* Atributos do paciente */}
//                <p>Telefone: {paciente.pac_telefone}</p>
//                <p>Data de Nascimento: {paciente.pac_data_nasc}</p>
//                <p>CPF: {paciente.pac_cpf}</p>
//                <p>Filhos: {paciente.pac_filho}</p>
//                <p>Escolaridade: {paciente.pac_escolaridade}</p>
//                <p>Trabalho: {paciente.pac_trabalho}</p>
//                <p>Estado Civil: {paciente.pac_estado_civil}</p>
//             </div>

//             <div className={styles.containerNotaSave}>
//                {/* Área para adicionar uma nota */}
//                <textarea
//                   placeholder="Adicionar nota..."
//                   value={nota}
//                   onChange={handleNoteChange}
//                   className={styles.notaTextarea}
//                />

//                {/* Botão de salvar a nota */}
//                <div className={styles.containerButton}>
//                   <button
//                      onClick={handleSaveNote}
//                      className={styles.saveButton}
//                   >
//                      Salvar Nota
//                   </button>
//                </div>
//             </div>

//             {/* Feedback sobre o status da operação */}
//             {statusMensagem && (
//                <p className={styles.statusMensagem}>{statusMensagem}</p>
//             )}
//          </div>
//       </div>
//    );
// }
