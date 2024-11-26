// import { Inter } from "next/font/google";
import { UserProvider } from "../../context/userContext";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// import Rodape from "@/componentes/rodape";

// import Cabecalho from "@/componentes/cabecalho";

export const metadata = {
   title: "Garden",
   description: "Sistema para psicólogo",
};
// export default function cabecalho({children}){
//    return (
//       <html lang="pt-br">
//          <body /*className={inter.className}*/>
//             {children}
//             <Rodape />
//          </body>
//       </html>
// }

<link rel="icon" href="./gardentp.ico" type="image/x-icon" />;

export default function RootLayout({ children }) {
   return (
      <html lang="pt-br">
         <body>
            <UserProvider>{children}</UserProvider>
         </body>
      </html>
   );
}
