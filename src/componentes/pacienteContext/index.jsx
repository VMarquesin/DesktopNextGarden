import { createContext, useContext, useState } from "react";

const PacienteContext = createContext();

export function usePaciente() {
   return useContext(PacienteContext);
}

export function PacienteProvider({ children }) {
   const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

   return (
      <PacienteContext.Provider value={{ pacienteSelecionado, setPacienteSelecionado }}>
         {children}
      </PacienteContext.Provider>
   );
}
