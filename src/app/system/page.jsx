"use client";

import Head from "next/head";
import styles from "./page.module.css";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import PacienteButton from "../../componentes/pacienteButton";
import PsicologoAnotacao from "../../componentes/psicologoAnotacao";

import PacienteDiario from "../../componentes/pacienteDiario";
import PacienteExercicios from "../../componentes/pacienteExericios";

import LembreteSessao from "../../componentes/lembreteSessao";
import Dashboard from "../../componentes/dashboard";

import api from "../../../services/api";

import Notifications from "../../componentes/notificacao";

import { useContext } from "react";

import { UserContext } from "../../../context/userContext";

// import { PacienteProvider } from "../componentes/pacienteContext";
// import { Feather } from "react-icons/fa";

export default function Home() {
   const [Tela, setTela] = useState(0);
   const [pacienteSel, setPacienteSel] = useState(0);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   // const [psicologoInfo, setPsicologoInfo] = useState(null);
   const [editMode, setEditMode] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
   const perfilRef = useRef();

   const { psicologoInfo } = useContext(UserContext)

   console.log("aaaa",psicologoInfo)
   // const fetchPsicologoInfo = async () => {
   //    try {
   //       const usu_id = 10;
   //       const psi_id = 1;
   //       const usuarioResponse = await api.get(`/usuario/${usu_id}`);
   //       const psicologoResponse = await api.get(`/psicologo/${psi_id}`);

   //       setPsicologoInfo({
   //          ...usuarioResponse.data.dados[0],
   //          ...psicologoResponse.data.dados[0],
   //       });
   //    } catch (error) {
   //       console.error("Erro ao buscar informações do psicólogo:", error);
   //    }
   // };

   useEffect(() => {
      if (searchTerm.length > 0) {
        // Chama a API para buscar pacientes
        const fetchPacientes = async () => {
          try {
            const response = await api.get(`/usuarios/pacientes?nome=${searchTerm}`);
            setPacientesFiltrados(response.data.dados); // Ajuste para o retorno da API
          } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
          }
        };
  
        fetchPacientes();
      } else {
        setPacientesFiltrados([]); // Limpa a lista se não houver termo de busca
      }
    }, [searchTerm]);

   const handleProfileClick = () => {
      setIsProfileOpen(!isProfileOpen);
      if (!psicologoInfo) {
         fetchPsicologoInfo();
      }
   };

   useEffect(() => {
      // Verifica se clicou fora de notificações
      const handleClickOutside = (event) => {
         if (
            perfilRef.current &&
            !perfilRef.current.contains(event.target)
         ) {
            setIsProfileOpen(false);
         }
      };

      // Ouvinte para cliques no documento

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);
   // console.log=handleProfileClick, "error"

   const handleSaveChanges = async () => {
      try {
         await api.patch(`/psicologo/${psicologoInfo.psi_id}`, {
            usu_nome: psicologoInfo.usu_nome,
            usu_nick: psicologoInfo.usu_nick,
            usu_email: psicologoInfo.usu_email,
            psi_endereco: psicologoInfo.psi_endereco,
            psi_cnpj: psicologoInfo.psi_cnpj,
         });
         setEditMode(false);
      } catch (error) {
         console.error("Erro ao salvar alterações:", error);
      }
   };

   function carregaPaciente(id) {
      setPacienteSel(id);
   }
   console.log(pacienteSel, "test");

   return (
      <div className={styles.containerGlobal}>
         <Head>
            <title>Área de Trabalho - Psicólogo</title>
         </Head>
         <div className={styles.container}>
            {/* Topbar */}

            <header className={styles.header}>
               <div className={styles.headercontainer}>
                  <div className={styles.logo}>
                     <Image
                        src="/images/logoGarden.png"
                        alt="logo Garden"
                        width={140}
                        height={50}
                        // className={styles.icone}
                     />
                     <p></p>
                  </div>
                  <nav>
                     <ul>
                        {/* <li>
                           <div className={styles.notifications}>
                              <Notifications />
                           </div>
                        </li> */}
                        <li>
                           <span className={styles.profileName}>{psicologoInfo ? psicologoInfo.usu_nome : "Erro na busca"}</span>
                        </li>
                        <li >
                           <img
                              src="https://photos.psychologytoday.com/467daa31-46cd-11ea-a6ad-06142c356176/3/320x400.jpeg"
                              alt="Profile"
                              className={styles.profileImage}
                              onClick={handleProfileClick}
                              ref={perfilRef}
                           />
                           {/* {console.log={handleProfileClick}} */}
                        </li>
                     </ul>
                  </nav>
               </div>
            </header>
            {isProfileOpen && psicologoInfo && (
               <div ref={perfilRef} className={styles.profileDropdown}>
                  {editMode ? (
                     <>
                        <input
                           type="text"
                           value={psicologoInfo.usu_nome}
                           onChange={(e) =>
                              setPsicologoInfo({
                                 ...psicologoInfo,
                                 usu_nome: e.target.value,
                              })
                           }
                        />
                        <input
                           type="text"
                           value={psicologoInfo.usu_nick}
                           onChange={(e) =>
                              setPsicologoInfo({
                                 ...psicologoInfo,
                                 usu_nick: e.target.value,
                              })
                           }
                        />
                        <input
                           type="email"
                           value={psicologoInfo.usu_email}
                           onChange={(e) =>
                              setPsicologoInfo({
                                 ...psicologoInfo,
                                 usu_email: e.target.value,
                              })
                           }
                        />
                        <input
                           type="text"
                           value={psicologoInfo.psi_endereco}
                           onChange={(e) =>
                              setPsicologoInfo({
                                 ...psicologoInfo,
                                 psi_endereco: e.target.value,
                              })
                           }
                        />
                        <input
                           type="text"
                           value={psicologoInfo.psi_cnpj}
                           onChange={(e) =>
                              setPsicologoInfo({
                                 ...psicologoInfo,
                                 psi_cnpj: e.target.value,
                              })
                           }
                        />
                        <button onClick={handleSaveChanges}>Salvar</button>
                        <button onClick={() => setEditMode(false)}>
                           Cancelar
                        </button>
                     </>
                  ) : (
                     <>
                        <p>Nome: {psicologoInfo.usu_nome}</p>
                        <p>Nick: {psicologoInfo.usu_nick}</p>
                        <p>Email: {psicologoInfo.usu_email}</p>
                        <p>Endereço: {psicologoInfo.psi_endereco}</p>
                        <p>CNPJ: {psicologoInfo.psi_cnpj}</p>
                        <button onClick={() => setEditMode(true)}>
                           Editar
                        </button>
                     </>
                  )}
               </div>
            )}
            {/* Pesquisa de paciente */}

            <section className={styles.patientSelect}>
          <PacienteButton carregaPaciente={carregaPaciente} />
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Pesquisar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {pacientesFiltrados.length > 0 && (
              <ul className={styles.pacientesList}>
                {pacientesFiltrados.map((paciente) => (
                  <li key={paciente.usu_id} onClick={() => carregaPaciente(paciente.usu_id)}>
                    {paciente.usu_nome}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        
            {/* barra lateral */}

            <aside className={styles.sidebar}>
               <ul>
                  <li>
                     <button
                        data-target="#anotacoes"
                        onClick={() => setTela(1)}
                        className={Tela === 1 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/Note.svg"
                           alt="Note"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Anotações</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#diario"
                        onClick={() => setTela(2)}
                        className={Tela === 2 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/diario.svg"
                           alt="Diario"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <book-open />
                        <p>Diário</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#Exercícios"
                        onClick={() => setTela(3)}
                        className={Tela === 3 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/exercicios.svg"
                           alt="Exercícios"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Exercícios</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#lembrete"
                        onClick={() => setTela(4)}
                        className={Tela === 4 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/lembrete.svg"
                           alt="tiktok"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />

                        <p>Lembrete</p>
                     </button>
                  </li>
                  <li>
                     <button
                        data-target="#dashboard"
                        onClick={() => setTela(5)}
                        className={Tela === 5 ? styles.activeButton : " "}
                     >
                        <Image
                           src="/icones/dashboard.svg"
                           alt="Dashboard"
                           width={20}
                           height={20}
                           className={styles.icone}
                        />
                        <p>Dashboard</p>
                     </button>
                  </li>
               </ul>
            </aside>

            <main className={styles.mainContent}>
               {Tela === 1 ? (
                  <PsicologoAnotacao pacienteId={pacienteSel} />
               ) : Tela === 2 ? (
                  <PacienteDiario pacienteId={pacienteSel} />
               ) : Tela === 3 ? (
                  <PacienteExercicios pacienteId={pacienteSel} />
               ) : Tela === 4 ? (
                  <LembreteSessao pacienteId={pacienteSel} />
               ) : Tela === 5 ? (
                  <Dashboard pacienteId={pacienteSel} />
               ) : null}
            </main>
         </div>
      </div>
   );
}

//  const [modalAberto, setModalAberto] = useState(false);

//  const abrirModal = () => setModalAberto(true);
//  const fecharModal = () => setModalAberto(false);

{
   /* opção abrir modal */
}
{
   /* <button
                        data-target="#exercicios"
                        onClick={abrirModal}
                     ></button>
                     {modalAberto && (
                        <div className={styles.modal}>
                           <div className={styles.modalContent}>
                              <span
                                 className={styles.closeButton}
                                 onClick={fecharModal}
                              >
                                 &times;
                              </span>

                              <h2>Conteudo</h2>
                              <p>conteudo modal</p>
                           </div>
                        </div>
                     )} */
}
