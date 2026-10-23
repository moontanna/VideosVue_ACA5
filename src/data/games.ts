import adoptme from '../assets/adoptme.jpg'
import bladeball from '../assets/bladeball.jpg'
import bloxfruits from '../assets/bloxfruits.jpg'
import brookhaven from '../assets/brookhaven.jpg'
import combatarena from '../assets/combatarena.jpg'
import doors from '../assets/doors.jpg'
import mimic from '../assets/mimic.jpg'
import pressure from '../assets/pressure.jpg'
import rivals from '../assets/rivals.jpg'

export interface Game {
  id: number
  titulo: string
  categoria: 'Sandbox' | 'Terror' | 'Battle'
  personajes: string
  desarrollador: string
  descripcion: string
  youtube: string
  roblox: string
  imagen: string
}

export const games: Game[] = [
  {
    id: 1,
    titulo: 'Brookhaven RP',
    categoria: 'Sandbox',
    personajes: 'Jugadores',
    desarrollador: 'Wolfpaq',
    descripcion: 'Explora una ciudad llena de posibilidades.',
    youtube: 'https://www.youtube.com/embed/Xn4sDgKModE',
    roblox: 'https://www.roblox.com/games/4924922222/Brookhaven-RP',
    imagen: brookhaven,
  },
  {
    id: 2,
    titulo: 'Blox Fruits',
    categoria: 'Sandbox',
    personajes: 'Piratas',
    desarrollador: 'Gamer Robot Inc.',
    descripcion: 'Consigue frutas poderosas y explora islas.',
    youtube: 'https://www.youtube.com/embed/1tffqhaqxRI',
    roblox: 'https://www.roblox.com/games/2753915549/Blox-Fruits',
    imagen: bloxfruits,
  },
  {
    id: 3,
    titulo: 'Adopt Me!',
    categoria: 'Sandbox',
    personajes: 'Mascotas',
    desarrollador: 'Uplift Games',
    descripcion: 'Colecciona mascotas y construye tu casa.',
    youtube: 'https://www.youtube.com/embed/SKxM8GPT3cc',
    roblox: 'https://www.roblox.com/games/920587237/Adopt-Me',
    imagen: adoptme,
  },
  {
    id: 4,
    titulo: 'DOORS',
    categoria: 'Terror',
    personajes: 'Exploradores',
    desarrollador: 'LSPLASH',
    descripcion: 'Escapa de entidades aterradoras.',
    youtube: 'https://www.youtube.com/embed/HpdHXoaqek0',
    roblox: 'https://www.roblox.com/games/6516141723/DOORS',
    imagen: doors,
  },
  {
    id: 5,
    titulo: 'The Mimic',
    categoria: 'Terror',
    personajes: 'Estudiantes',
    desarrollador: 'MUCDICH',
    descripcion: 'Sobrevive a criaturas inspiradas en leyendas japonesas.',
    youtube: 'https://www.youtube.com/embed/79WlU1Lnzl4',
    roblox: 'https://www.roblox.com/games/6243699076/The-Mimic',
    imagen: mimic,
  },
  {
    id: 6,
    titulo: 'Pressure',
    categoria: 'Terror',
    personajes: 'Investigadores',
    desarrollador: 'Urbanshade',
    descripcion: 'Escapa de un laboratorio lleno de monstruos.',
    youtube: 'https://www.youtube.com/embed/BSJMyfPBUOc',
    roblox: 'https://www.roblox.com/games/12411473842/Pressure',
    imagen: pressure,
  },
  {
    id: 7,
    titulo: 'Combat Arena',
    categoria: 'Battle',
    personajes: 'Luchadores',
    desarrollador: 'Combat Arena Devs',
    descripcion: 'Combate contra otros jugadores usando distintas habilidades.',
    youtube: 'https://www.youtube.com/embed/CHdLRMnfYws',
    roblox: 'https://www.roblox.com/games/6985028624/Combat-Arena',
    imagen: combatarena,
  },
  {
    id: 8,
    titulo: 'Blade Ball',
    categoria: 'Battle',
    personajes: 'Guerreros',
    desarrollador: 'Wiggity',
    descripcion: 'Desvía la pelota antes de que te elimine.',
    youtube: 'https://www.youtube.com/embed/VpRfBDcs4Is',
    roblox: 'https://www.roblox.com/games/13772394625/Blade-Ball',
    imagen: bladeball,
  },
  {
    id: 9,
    titulo: 'RIVALS',
    categoria: 'Battle',
    personajes: 'Agentes',
    desarrollador: 'Nosniy Games',
    descripcion: 'FPS competitivo con armas y mapas llenos de acción.',
    youtube: 'https://www.youtube.com/embed/TYDoNYa-Jz8',
    roblox: 'https://www.roblox.com/games/17625359962/RIVALS',
    imagen: rivals,
  },
]
