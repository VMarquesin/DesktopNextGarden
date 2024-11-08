"use client";

import { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";

import api from "../../services/api";
import { UserContext } from "../../../context/userContext";


export default function PacientePerfil({ paciente, onSaveNote }) {
   const [nota, setNota] = useState("");
   const [statusMensagem, setStatusMensagem] = useState("");
   const [usuario, setUsuario] = useState(null);
   const { psicologoInfo } = useContext (UserContext);

   const handleNoteChange = (e) => {
      setNota(e.target.value);
   };

   // useEffect(() => {
   //    async function fetchUsuario() {
   //       try {
   //          console.log("ID do usuário:", usuario.usu_id);
   //          const response = await api.get(`/usuarios/${usuario.usu_id}`);
   //          console.log("Resposta da API para o usuário:", response.data);

   //          if (response.data && response.data.dados) {
   //             setUsuario(response.data.dados);
   //          } else {
   //             console.error("Dados do usuário não encontrados na resposta.");
   //          }
   //       } catch (error) {
   //          console.error(
   //             "Erro ao buscar o usuário:",
   //             error.response ? error.response.data : error.message
   //          );
   //       }
   //    }

   //    fetchUsuario();
   // }, []);

   const handleSaveNote = async () => {
      try {
         const response = await api.post("/psi_anotacao", {
            psi_id: psicologoInfo.psi_id,
            pan_anotacao: nota,
            pan_anotacao_data:"1964-02-16",
            pac_id: paciente.pac_id
         });
         setStatusMensagem("Nota salva com sucesso!");
         setNota("");
      } catch (error) {
         setStatusMensagem("Erro ao salvar a nota.");
         console.error("Erro ao salvar a nota:", error);
      }
   };

   return (
      <div className={styles.refContainer}>
         <div className={styles.perfilContainer}>
            <div className={styles.containerNome}>
               {/* Imagem e informações do paciente */}
               <div className={styles.nome}>
                  {paciente ? (
                     <>
                        <h2>{paciente.usu_nome}</h2> {/* Nome do usuário */}
                        <h3>{paciente.usu_nick}</h3> {/* Nickname do usuário */}
                     </>
                  ) : (
                     <p>Carregando informações do paciente...</p>
                  )}
               </div>
            </div>

            <div className={styles.atributos}>
               {/* Atributos do paciente */}
               <p>Telefone: {paciente.pac_telefone}</p>
               <p>Data de Nascimento: {paciente.pac_data_nasc}</p>
               <p>CPF: {paciente.pac_cpf}</p>
               <p>Filhos: {paciente.pac_filho}</p>
               <p>Escolaridade: {paciente.pac_escolaridade}</p>
               <p>Trabalho: {paciente.pac_trabalho}</p>
               <p>Estado Civil: {paciente.pac_estado_civil}</p>
            </div>

            <div className={styles.containerNotaSave}>
               {/* Área para adicionar uma nota */}
               <textarea
                  placeholder="Adicionar nota..."
                  value={nota}
                  onChange={handleNoteChange}
                  className={styles.notaTextarea}
               />

               {/* Botão de salvar a nota */}
               <div className={styles.containerButton}>
                  <button
                     onClick={handleSaveNote}
                     className={styles.saveButton}
                  >
                     Salvar Nota
                  </button>
               </div>
            </div>

            {/* Feedback sobre o status da operação */}
            {statusMensagem && (
               <p className={styles.statusMensagem}>{statusMensagem}</p>
            )}
         </div>
      </div>
   );
}

// "use client";

// import { useState, useEffect } from "react";
// import styles from "./index.module.css";

// import api from "../../../services/api";

// export default function PacientePerfil({ paciente }) {
//    const [nota, setNota] = useState("");
//    const [statusMensagem, setStatusMensagem] = useState("");
//    const [usuario, setUsuario] = useState(null);

//    const handleNoteChange = (e) => {
//       setNota(e.target.value);
//    };

//    useEffect(() => {
//       async function fetchUsuario() {
//          try {

//             const response = await api.get(`/usuarios/${paciente.usu_id}`);
//             setUsuario(response.data.dados);
//          } catch (error) {
//             console.error("Erro ao buscar o usuário:", error);
//          }
//       }

//       if (paciente.usu_id) {
//          fetchUsuario();
//       }
//    }, [paciente.usu_id]);

//    // Função para salvar a nota e enviar à API
//    const handleSaveNote = async () => {
//       try {
//          const response = await api.post("/psi_anotacao", {
//             pacienteId: paciente.pac_id, // ID do paciente
//             conteudo: nota, // Conteúdo da nota
//          });
//          setStatusMensagem("Nota salva com sucesso!");
//          setNota(""); // Limpa o campo de nota após o sucesso
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
//                <img
//                   src={paciente.foto}
//                   alt={`Foto de ${paciente.nome}`}
//                   className={styles.fotoPerfil}
//                />
//                <div className={styles.nome}>
//                   {usuario ? (
//                      <>
//                         <h2>{usuario.usu_nome}</h2>
//                         <h3>{usuario.usu_nick}</h3>
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
//                <p>Status: {paciente.pac_status}</p>
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
//             {statusMensagem && <p className={styles.statusMensagem}>{statusMensagem}</p>}
//          </div>
//       </div>
//    );
// }
