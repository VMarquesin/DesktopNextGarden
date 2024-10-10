"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import api from "../../../services/api";

export default function PsicologoAnotacao({ pacienteId }) {
  const [anotacoes, setAnotacoes] = useState([]);
  const [conteudo, setConteudo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnotacao, setSelectedAnotacao] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Controle de modo de edição

  useEffect(() => {
    async function fetchAnotacoes() {
      try {
        const response = await api.get(`/psi_anotacao/${pacienteId}`);
        setAnotacoes(response.data.dados);
      } catch (error) {
        console.error("Erro ao buscar anotações:", error);
      }
    }

    fetchAnotacoes();
  }, [pacienteId]);

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
    if (!conteudo || !pacienteId) {
      console.error("Conteúdo da anotação ou paciente não definido.");
      return;
    }

    try {
      const response = await api.post("/psi_anotacao", {
        psi_id: 1, // Esse id pode ser ajustado para o psicólogo correto
        pan_anotacao: conteudo,
        pan_anotacao_data: new Date().toISOString().split("T")[0],
        pac_id: pacienteId,
      });

      // Atualiza a lista de anotações após salvar
      setAnotacoes((prevAnotacoes) =>
        prevAnotacoes.map((anotacao) =>
          anotacao.pan_id === selectedAnotacao.pan_id
            ? { ...anotacao, pan_anotacao: conteudo }
            : anotacao
        )
      );
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
