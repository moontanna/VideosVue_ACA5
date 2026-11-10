export interface JuegoTienda {
  titulo: string
  imagen: string
  descripcion: string
  precio: number
  estreno?: string
}

export const juegosTienda: JuegoTienda[] = [
  { titulo: 'Elden Ring',
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    descripcion: 'Explora las Tierras Intermedias y enfrÃ©ntate a desafÃ­os legendarios.', 
    precio: 799.80, 
    estreno: '25 de febrero de 2022' },

  { titulo: 'Minecraft Java & Bedrock', 
    imagen: 'https://imgs.search.brave.com/YfEhHHKpGq59_TPLZqtsqNEPPv7M6_LEYfYgdAjeaxc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3c1/Lm1pbmlqdWVnb3Nn/cmF0aXMuY29tL3Yz/L2dhbWVzL3RodW1i/bmFpbHMvMjM5NzY0/XzEuanBn', 
    descripcion: 'Construye, sobrevive y crea tu propia aventura sin lÃ­mites.', 
    precio: 599.80 },

  { titulo: 'Grand Theft Auto V', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg', 
    descripcion: 'Vive una historia criminal inolvidable y disfruta de GTA Online.', 
    precio: 399.80, estreno: '17 de septiembre de 2013' },

  { titulo: 'Baldurâ€™s Gate 3', imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg', 
    descripcion: 'Forma tu grupo y decide el destino de los Reinos Olvidados.', 
    precio: 1199.80, 
    estreno: '3 de agosto de 2023' },

  { titulo: 'Cyberpunk 2077', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', 
    descripcion: 'ConviÃ©rtete en un mercenario aumentado en Night City.', 
    precio: 699.80, 
    estreno: '10 de diciembre de 2020' },

  { titulo: 'The Witcher 3: Wild Hunt', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg', 
    descripcion: 'Caza monstruos y descubre una Ã©pica aventura de fantasi­a.', 
    precio: 499.80, estreno: '19 de mayo de 2015' },


  { titulo: 'Red Dead Redemption 2', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg', 
    descripcion: 'Descubre el ocaso del salvaje oeste con la banda de Van der Linde.', 
    precio: 799.80, 
    estreno: '26 de octubre de 2018' },

  { titulo: 'Hogwarts Legacy', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg', 
    descripcion: 'Vive tu propia historia como estudiante de magia en Hogwarts.', 
    precio: 899.80, 
    estreno: '10 de febrero de 2023' },

  { titulo: 'Resident Evil 4', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg', 
    descripcion: 'Sobrevive a una misiÃ³n de rescate que cambiarÃ¡ tu pesadilla.', 
    precio: 999.80, 
    estreno: '24 de marzo de 2023' },

  { titulo: 'God of War RagnarÃ¶k', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg', 
    descripcion: 'AcompaÃ±a a Kratos y Atreus en un viaje por los nueve reinos.', 
    precio: 999.80, 
    estreno: '9 de noviembre de 2022' },

  { titulo: 'The Last of Us Part I', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg', 
    descripcion: 'Una historia de supervivencia y humanidad en un mundo devastado.', 
    precio: 1099.80, 
    estreno: '2 de septiembre de 2022' },

  { titulo: 'Marvelâ€™s Spider-Man 2', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg', 
    descripcion: 'Balancea entre rascacielos y enfrÃ©ntate a nuevos villanos.', 
    precio: 1199.80, 
    estreno: '20 de octubre de 2023' },

  { titulo: 'Forza Horizon 5', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg', 
    descripcion: 'Corre por los paisajes vibrantes y extremos de MÃ©xico.', 
    precio: 799.80, 
    estreno: '9 de noviembre de 2021' },

  { titulo: 'EA Sports FC 25', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/header.jpg', 
    descripcion: 'Lleva a tu club a la gloria con la nueva temporada de fÃºtbol.', 
    precio: 1099.80, 
    estreno: '27 de septiembre de 2024' },

  { titulo: 'Call of Duty: Black Ops 6', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2933620/header.jpg', 
    descripcion: 'SumÃ©rgete en una campaÃ±a de espionaje y combates intensos.', 
    precio: 1399.80, 
    estreno: '25 de octubre de 2024' },

  { titulo: 'Helldivers 2', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg', 
    descripcion: 'Une fuerzas para defender la libertad en una guerra galÃ¡ctica.', 
    precio: 799.80, 
    estreno: '8 de febrero de 2024' },

  { titulo: 'Hades',
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg', 
    descripcion: 'Escapa del inframundo en este roguelike de acciÃ³n mitolÃ³gica.', 
    precio: 399.80, 
    estreno: '17 de septiembre de 2020' },

  { titulo: 'Hollow Knight', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg', 
    descripcion: 'AdÃ©ntrate en un reino de insectos, secretos y combates precisos.', 
    precio: 299.80, 
    estreno: '24 de febrero de 2017' },
  
  { titulo: 'Stardew Valley', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg', 
    descripcion: 'Cultiva tu granja, conoce a la comunidad y crea tu nueva vida.', 
    precio: 279.80, 
    estreno: '26 de febrero de 2016' },

  { titulo: 'Terraria', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg', 
    descripcion: 'Excava, lucha y construye en un mundo lleno de posibilidades.', 
    precio: 199.80, 
    estreno: '16 de mayo de 2011' },

  { titulo: 'Sea of Thieves', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg', 
    descripcion: 'Navega, encuentra tesoros y escribe tu propia leyenda pirata.', 
    precio: 599.80, 
    estreno: '20 de marzo de 2018' },

  { titulo: 'Palworld', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg', 
    descripcion: 'Captura criaturas, construye tu base y sobrevive en un mundo abierto.', 
    precio: 539.80, 
    estreno: '19 de enero de 2024' },

  { titulo: 'ARK: Survival Ascended', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/header.jpg', 
    descripcion: 'Domina dinosaurios y reconstruye tu supervivencia desde cero.', 
    precio: 899.80, 
    estreno: '25 de octubre de 2023' },

  { titulo: 'Lies of P', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1627720/header.jpg', 
    descripcion: 'Descubre una versiÃ³n oscura de Pinocho con combates exigentes.', precio: 999.80, estreno: '19 de septiembre de 2023' },

  { titulo: 'Final Fantasy VII Rebirth', imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2909400/header.jpg', 
    descripcion: 'ContinÃºa el viaje de Cloud en una aventura inolvidable.', 
    precio: 1399.80, 
    estreno: '29 de febrero de 2024' },

  { titulo: 'Dragon Age: The Veilguard', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1845910/header.jpg', 
    descripcion: 'ReÃºne a tus aliados y protege Thedas de una nueva amenaza.', 
    precio: 1199.80, 
    estreno: '31 de octubre de 2024' },

  { titulo: 'Tekken 8', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg', 
    descripcion: 'Domina el combate y decide quiÃ©n reina en el torneo del puÃ±o de hierro.', 
    precio: 799.80, 
    estreno: '26 de enero de 2024' },

  { titulo: 'Street Fighter 6', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header.jpg', 
    descripcion: 'Aprende, combate y demuestra tu estilo en la nueva era de Street Fighter.', 
    precio: 699.80, 
    estreno: '2 de junio de 2023' },

  { titulo: 'Sifu', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2138710/header.jpg', 
    descripcion: 'Perfecciona el kung fu y cobra una deuda familiar pendiente.', 
    precio: 499.80, 
    estreno: '8 de febrero de 2022' },

  { titulo: 'Dave the Diver', 
    imagen: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1868140/header.jpg', 
    descripcion: 'Pesca de dÃ­a y gestiona un restaurante de sushi por la noche.', 
    precio: 399.80, 
    estreno: '28 de junio de 2023' },
]
