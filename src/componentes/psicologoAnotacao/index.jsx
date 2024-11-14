// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "./index.module.css";
// import api from "../../../services/api";

// export default function PsicologoAnotacao({ pacienteId }) {
//   const [anotacoes, setAnotacoes] = useState([]);
//   const [conteudo, setConteudo] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAnotacao, setSelectedAnotacao] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     async function fetchAnotacoes() {
//       try {
//         const response = await api.get(`/psi_anotacao/${pacienteId}`);
//         setAnotacoes(response.data.dados);
//       } catch (error) {
//         console.error("Erro ao buscar anotações:", error);
//       }
//     }

//     if (pacienteId) fetchAnotacoes();
//   }, [pacienteId]);

//   const openModal = (anotacao) => {
//     setSelectedAnotacao(anotacao);
//     setConteudo(anotacao.pan_anotacao);
//     setIsEditMode(false);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedAnotacao(null);
//     setConteudo("");
//     setIsEditMode(false);
//   };

//   const handleSave = async () => {
//     if (!conteudo || !pacienteId) {
//       console.error("Conteúdo da anotação ou paciente não definido.");
//       return;
//     }

//     try {
//       if (isEditMode) {
//         await api.put(`/psi_anotacao/${selectedAnotacao.pan_id}`, {
//           pan_anotacao: conteudo,
//           pan_anotacao_data: new Date().toISOString().split("T")[0],
//         });
//         setAnotacoes((prev) =>
//           prev.map((anotacao) =>
//             anotacao.pan_id === selectedAnotacao.pan_id
//               ? { ...anotacao, pan_anotacao: conteudo }
//               : anotacao
//           )
//         );
//       } else {
//         const response = await api.post("/psi_anotacao", {
//           psi_id: 1, // Ajuste conforme o ID do psicólogo logado
//           pan_anotacao: conteudo,
//           pan_anotacao_data: new Date().toISOString().split("T")[0],
//           pac_id: pacienteId,
//         });
//         setAnotacoes((prev) => [...prev, response.data.dados]);
//       }
//       closeModal();
//     } catch (error) {
//       console.error("Erro ao salvar anotação:", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <aside className={styles.sidebar}>
//         <h3>SUAS NOTAS</h3>
//         <ul className={styles.anotacoesLista}>
//           {anotacoes.length > 0 ? (
//             anotacoes.map((anotacao) => (
//               <li key={anotacao.pan_id} onClick={() => openModal(anotacao)}>
//                 <p>{anotacao.pan_anotacao.slice(0, 17)}...</p>
//                 <p>
//                   {new Date(anotacao.pan_anotacao_data).toLocaleDateString(
//                     "pt-BR"
//                   )}
//                 </p>
//               </li>
//             ))
//           ) : (
//             <p>Selecione um paciente</p>
//           )}
//         </ul>
//       </aside>
//       <main className={styles.mainContent}>
//         <textarea
//           placeholder="Escreva suas anotações aqui..."
//           className={styles.textoArea}
//           value={conteudo}
//           onChange={(e) => setConteudo(e.target.value)}
//         />
//         <div className={styles.botoes}>
//           <button className={styles.salvarButton} onClick={handleSave}>
//             Salvar
//           </button>
//           <button className={styles.cancelarButton} onClick={closeModal}>
//             Cancelar
//           </button>
//         </div>
//       </main>

//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h3>Anotação</h3>
//             {isEditMode ? (
//               <textarea
//                 className={styles.textoArea}
//                 value={conteudo}
//                 onChange={(e) => setConteudo(e.target.value)}
//               />
//             ) : (
//               <p>{selectedAnotacao?.pan_anotacao}</p>
//             )}
//             <p>
//               {new Date(selectedAnotacao?.pan_anotacao_data).toLocaleDateString(
//                 "pt-BR"
//               )}
//             </p>
//             <div className={styles.modalButtons}>
//               {isEditMode ? (
//                 <button className={styles.salvarButton} onClick={handleSave}>
//                   Salvar
//                 </button>
//               ) : (
//                 <button
//                   className={styles.editarButton}
//                   onClick={() => setIsEditMode(true)}
//                 >
//                   Editar
//                 </button>
//               )}
//               <button className={styles.closeButton} onClick={closeModal}>
//                 Fechar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import styles from "./index.module.css";
// // import api from "../../../services/api"; // Desative o import da API por enquanto

// export default function PsicologoAnotacao({ pacienteId }) {
//   const [anotacoes, setAnotacoes] = useState([]);
//   const [conteudo, setConteudo] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAnotacao, setSelectedAnotacao] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false); // Controle de modo de edição

//   useEffect(() => {
//     // Função mock para simular a busca de anotações
//     function fetchMockAnotacoes() {
//       const mockAnotacoes = [
//         {
//           pan_id: 1,
//           pan_anotacao: "Primeira anotação de exemplo",
//           pan_anotacao_data: "2024-10-17",
//           psi_id: 1,
//           pac_id: pacienteId,
//         },
//         {
//           pan_id: 2,
//           pan_anotacao: "Segunda anotação para teste",
//           pan_anotacao_data: "2024-10-16",
//           psi_id: 1,
//           pac_id: pacienteId,
//         },
//         {
//           pan_id: 3,
//           pan_anotacao: "Terceira anotação de exemplo para visualização, Terceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualizaçãoTerceira anotação de exemplo para visualização",
//           pan_anotacao_data: "2024-10-15",
//           psi_id: 1,
//           pac_id: pacienteId,
//         },
//       ];
//       setAnotacoes(mockAnotacoes);
//     }

//     // Comente a função real e use a função mock para simular os dados
//     // async function fetchAnotacoes() {
//     //   try {
//     //     const response = await api.get(`/psi_anotacao/${pacienteId}`);
//     //     setAnotacoes(response.data.dados);
//     //   } catch (error) {
//     //     console.error("Erro ao buscar anotações:", error);
//     //   }
//     // }

//     // fetchAnotacoes();
//     fetchMockAnotacoes(); // Carrega os dados simulados
//   }, [pacienteId]);

//   const openModal = (anotacao) => {
//     setSelectedAnotacao(anotacao);
//     setConteudo(anotacao.pan_anotacao); // Preenche o conteúdo com a anotação selecionada
//     setIsEditMode(false); // Modal inicia em modo de visualização
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedAnotacao(null);
//     setConteudo("");
//     setIsEditMode(false); // Fecha o modal e volta para modo de visualização
//   };

//   const handleSave = async () => {
//     if (!conteudo || !pacienteId) {
//       console.error("Conteúdo da anotação ou paciente não definido.");
//       return;
//     }

//     try {
//       // Simulação do salvamento de anotação sem API
//       const newAnotacao = {
//         pan_id: anotacoes.length + 1,
//         pan_anotacao: conteudo,
//         pan_anotacao_data: new Date().toISOString().split("T")[0],
//         psi_id: 1,
//         pac_id: pacienteId,
//       };
//       setAnotacoes([...anotacoes, newAnotacao]); // Adiciona a anotação simulada à lista
//       closeModal(); // Fecha o modal após salvar
//     } catch (error) {
//       console.error("Erro ao salvar anotação:", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <aside className={styles.sidebar}>
//         <h3>SUAS NOTAS</h3>
//         <ul className={styles.anotacoesLista}>
//           {anotacoes.length > 0 ? (
//             anotacoes.map((anotacao) => (
//               <li key={anotacao.pan_id} onClick={() => openModal(anotacao)}>
//                 <p>{anotacao.pan_anotacao.slice(0, 17)}...</p>
//                 <p>
//                   {new Date(anotacao.pan_anotacao_data).toLocaleDateString(
//                     "pt-BR"
//                   )}
//                 </p>
//               </li>
//             ))
//           ) : (
//             <p>Selecione um paciente</p>
//           )}
//         </ul>
//       </aside>
//       <main className={styles.mainContent}>
//         <div className={styles.anotacao}>
//           <textarea
//             placeholder="Escreva suas anotações aqui..."
//             className={styles.textoArea}
//             value={conteudo}
//             onChange={(e) => setConteudo(e.target.value)}
//           />
//           <div className={styles.botoes}>
//             <button className={styles.salvarButton} onClick={handleSave}>
//               Salvar
//             </button>
//             <button
//               className={styles.cancelarButton}
//               onClick={() => setConteudo("")}
//             >
//               Cancelar
//             </button>
//           </div>
//         </div>
//       </main>

//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h3>Anotação</h3>
//             {isEditMode ? (
//               <textarea
//                 className={styles.modalTextoArea}
//                 value={conteudo}
//                 onChange={(e) => setConteudo(e.target.value)}
//               />
//             ) : (
//               <p>{selectedAnotacao?.pan_anotacao}</p>
//             )}
//             <p className={styles.modalData}>
//               {new Date(selectedAnotacao?.pan_anotacao_data).toLocaleDateString(
//                 "pt-BR"
//               )}
//             </p>
//             <div className={styles.modalButtons}>
//               {isEditMode ? (
//                 <button className={styles.salvarButton} onClick={handleSave}>
//                   Salvar
//                 </button>
//               ) : (
//                 <button
//                   className={styles.editarButton}
//                   onClick={() => setIsEditMode(true)}
//                 >
//                   Editar
//                 </button>
//               )}
//               <button className={styles.closeButton} onClick={closeModal}>
//                 Fechar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import api from "../../services/api";

export default function PsicologoAnotacao({ paciente }) {
  const [anotacoes, setAnotacoes] = useState([]);
  const [conteudo, setConteudo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnotacao, setSelectedAnotacao] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Controle de modo de edição

  async function fetchDeletarAnotacoes(pan_id) {
    try{
      await api.delete(`/psi_anotacao/${pan_id}`);
      setAnotacoes((prevAnotacoes) =>
      prevAnotacoes.filter((anotacoes) => anotacoes.pan_id !== pan_id)
    );
    setIsModalOpen(false);
    } catch (error) {
      console.error("Houve um problema ao deletar a anotação", error);
    }
  }

  useEffect(() => {
    async function fetchAnotacoes() {
      try {
        console.log(paciente)
        console.log('pac_id ', paciente.pac_id)
        const response = await api.get(`/psi_anotacao/${paciente.pac_id}}`);
        setAnotacoes(response.data.dados);
      } catch (error) {
        console.error("Erro ao buscar anotações:", error);
      }
    }

    fetchAnotacoes();
  }, [paciente]);

  const openModal = (anotacao) => {
    setSelectedAnotacao(anotacao);
    setConteudo(anotacao.pan_anotacao); // Preenche o conteúdo com a anotação selecionada
    setIsEditMode(false); // Modal inicia em modo de visualização
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnotacao(null);
    setConteudo("");
    setIsEditMode(false); // Fecha o modal e volta para modo de visualização
  };

  const handleSave = async () => {
    if (!conteudo || !paciente.pac_id) {
      console.error("Conteúdo da anotação ou paciente não definido.");
      return;
    }

    try {
      const response = await api.post("/psi_anotacao", {
        psi_id: 1, // Esse id pode ser ajustado para o psicólogo correto
        pan_anotacao: conteudo,
        pan_anotacao_data: new Date().toISOString().split("T")[0],
        pac_id: paciente.pac_id,
      });

      const novaAnotacao = response.data.dados;
      // Atualiza a lista de anotações após salvar
      setAnotacoes((prevAnotacoes) =>
        [novaAnotacao, selectedAnotacao
          ? prevAnotacoes.map((anotacao) =>
              anotacao.pan_id === selectedAnotacao.pan_id
                ? { ...anotacao, pan_anotacao: conteudo }
                : anotacao
            )
          : prevAnotacoes
      ]);

      closeModal(); // Fecha o modal após salvar
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>SUAS NOTAS</h3>
        <ul className={styles.anotacoesLista}>
          {anotacoes.length > 0 ? (
            anotacoes.map((anotacao) => (
              <li key={anotacao.pan_id} onClick={() => openModal(anotacao)}>
                
                <p>{anotacao.pan_anotacao.slice(0, 17)}...</p>
                <p>
                  {new Date(anotacao.pan_anotacao_data).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>
                {/* <Image
                        src="/Icones/Usuario.svg"
                        width={25}
                        height={25}
                        alt="Icone Usuário"
                        className={styles.Icons}
                     /> */}
              </li>
              
            ))
          ) : (
            <p>Selecione um paciente</p>
          )}
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.anotacao}>
          <textarea
            placeholder="Escreva suas anotações aqui..."
            className={styles.textoArea}
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
          <div className={styles.botoes}>
            <button className={styles.salvarButton} onClick={handleSave}>
              Salvar
            </button>
            <button className={styles.cancelarButton} onClick={() => setConteudo("")}>
              Cancelar
            </button>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Anotação</h3>
            {isEditMode ? (
              // Modo de edição: textarea para alterar o conteúdo
              <textarea
                className={styles.textoArea}
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
            ) : (
              // Modo de visualização: exibe o conteúdo como texto
              <p>{selectedAnotacao?.pan_anotacao}</p>
            )}
            <p>
              {new Date(selectedAnotacao?.pan_anotacao_data).toLocaleDateString(
                "pt-BR"
              )}
            </p>

            <div className={styles.modalButtons}>
              {isEditMode ? (
                <button className={styles.salvarButton} onClick={handleSave}>
                  Salvar
                </button>
              ) : (
                <button
                  className={styles.editarButton}
                  onClick={() => setIsEditMode(true)}
                >
                  Editar
                </button>
              )}
              <button className={styles.closeButton} onClick={closeModal}>
                Fechar
              </button>
              <button
                     className={styles.closeButton}
                     onClick={() =>
                      fetchDeletarAnotacoes(selectedAnotacao.pan_id)
                     }
                  >
                     Apagar
                  </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
