import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
   return (
      <header>
         <div className={styles.header}>
            <h1 className={styles.tituloHomePage}></h1>

            <Link href="/" className={styles.logo}>
               Garden
            </Link>

            <div>
               <input type="checkbox" id="menu-hamburger" />

               <label for="menu-hamburger">
                  <div class="menu">
                     <span class="hamburger"></span>
                  </div>
               </label>

               <li>
                  <a href="#">Login</a>
               </li>
            </div>
         </div>
      </header>
   );
}
