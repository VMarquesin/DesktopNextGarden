// // components/TeamCarousel.js
// "useCliente"

// import { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Navigation, Pagination, Autoplay } from 'swiper';
// import styles from './index.module.css'; // Importa o módulo CSS

// const TeamCarousel = () => {
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//       setIsMounted(true); // Atualiza o estado quando o componente é montado no cliente
//     }, []);

// const TeamCarousel = () => {
//   const teamMembers = [
//     {
//       name: 'Nome do Integrante 1',
//       role: 'Função do Integrante 1',
//       image: '/path/to/imagem-1.jpg',
//       description: 'Uma breve descrição do integrante 1.',
//     },
//     {
//       name: 'Nome do Integrante 2',
//       role: 'Função do Integrante 2',
//       image: '/path/to/imagem-2.jpg',
//       description: 'Uma breve descrição do integrante 2.',
//     },
//     {
//       name: 'Nome do Integrante 3',
//       role: 'Função do Integrante 3',
//       image: '/path/to/imagem-3.jpg',
//       description: 'Uma breve descrição do integrante 3.',
//     },
//     {
//       name: 'Nome do Integrante 4',
//       role: 'Função do Integrante 4',
//       image: '/path/to/imagem-4.jpg',
//       description: 'Uma breve descrição do integrante 4.',
//     },
//   ];

//   if (!isMounted) return null;

//   return (
//     <div className={styles.carouselContainer}>
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         spaceBetween={30}
//         slidesPerView={1}
//       >
//         {teamMembers.map((member, index) => (
//           <SwiperSlide key={index} className={styles.swiperSlide}>
//             <img
//               src={member.image}
//               alt={member.name}
//               className={styles.memberImage}
//             />
//             <h3 className={styles.memberName}>{member.name}</h3>
//             <p className={styles.memberRole}>{member.role}</p>
//             <p className={styles.memberDescription}>{member.description}</p>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TeamCarousel;
