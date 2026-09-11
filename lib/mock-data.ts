export type CategorySeed = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  sortOrder: number;
};

export type RestaurantSeed = {
  id: string;
  name: string;
  city: string;
  address: string;
  cuisine: string;
  photo: string;
  googleRating: number;
  website: string;
  googlePlaceId: string;
  totalRatings: number;
  averageGlobal: number;
  categoryAverages: Record<string, number>;
};

export const categories: CategorySeed[] = [
  { id: "cat-espai", name: "ESPAI", slug: "espai", active: true, sortOrder: 1 },
  { id: "cat-cuina", name: "CUINA", slug: "cuina", active: true, sortOrder: 2 },
  { id: "cat-menjar", name: "MENJAR", slug: "menjar", active: true, sortOrder: 3 },
  { id: "cat-postres", name: "POSTRES", slug: "postres", active: true, sortOrder: 4 },
  { id: "cat-servei", name: "SERVEI", slug: "servei", active: true, sortOrder: 5 },
  { id: "cat-preu", name: "PREU", slug: "preu", active: true, sortOrder: 6 },
  { id: "cat-plat-estrella", name: "PLAT ESTRELLA", slug: "plat-estrella", active: true, sortOrder: 7 },
];

export const mockUser = {
  id: "user-1",
  name: "Alicia Roca",
  alias: "Ali",
  email: "alicia@jocdecartes.app",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  bio: "Amante del tast i de les experiències compartides.",
};

export const mockRestaurants: RestaurantSeed[] = [
  {
    id: "rest-1",
    name: "La Brasa del Port",
    city: "Barcelona",
    address: "Moll dels Pescadors, 14",
    cuisine: "Marisc i mediterrània",
    photo:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    googleRating: 4.8,
    website: "https://labrasadelport.com",
    googlePlaceId: "ChIJ3c1v9jW6p0cRr5M5zJ2NfQ8",
    totalRatings: 42,
    averageGlobal: 8.72,
    categoryAverages: {
      ESPAI: 8.8,
      CUINA: 9.1,
      MENJAR: 8.9,
      POSTRES: 7.9,
      SERVEI: 8.4,
      PREU: 7.5,
      "PLAT ESTRELLA": 9.3,
    },
  },
  {
    id: "rest-2",
    name: "Sabor de Bosc",
    city: "Girona",
    address: "Carrer de la Font, 7",
    cuisine: "Creativa",
    photo:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    googleRating: 4.6,
    website: "https://sabordebosc.example",
    googlePlaceId: "ChIJ3a7l2ja4p0cResM3zN4P3V2",
    totalRatings: 28,
    averageGlobal: 8.26,
    categoryAverages: {
      ESPAI: 8.2,
      CUINA: 8.7,
      MENJAR: 8.8,
      POSTRES: 8.3,
      SERVEI: 7.8,
      PREU: 7.6,
      "PLAT ESTRELLA": 8.9,
    },
  },
  {
    id: "rest-3",
    name: "Casa del Forn",
    city: "València",
    address: "Plaça de la Verge, 3",
    cuisine: "Clàssica",
    photo:
      "https://images.unsplash.com/photo-1537047902294-62a40cda9756?auto=format&fit=crop&w=900&q=80",
    googleRating: 4.9,
    website: "https://casadelforn.example",
    googlePlaceId: "ChIJ0b6mF9pS4rYcQf0sP3u2i5D",
    totalRatings: 55,
    averageGlobal: 8.91,
    categoryAverages: {
      ESPAI: 9.0,
      CUINA: 9.2,
      MENJAR: 9.0,
      POSTRES: 8.7,
      SERVEI: 8.9,
      PREU: 8.1,
      "PLAT ESTRELLA": 9.4,
    },
  },
];

export const mockMyRestaurants = [
  {
    id: "user-rest-1",
    name: "La Brasa del Port",
    city: "Barcelona",
    cuisine: "Marisc i mediterrània",
    photo:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    source: "SESSION_CREATED",
    addedAt: "2026-09-02",
    isRated: true,
    personalAverage: 8.8,
    globalAverage: 8.72,
  },
  {
    id: "user-rest-2",
    name: "Sabor de Bosc",
    city: "Girona",
    cuisine: "Creativa",
    photo:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    source: "SESSION_PARTICIPATION",
    addedAt: "2026-09-05",
    isRated: false,
    personalAverage: null,
    globalAverage: 8.26,
  },
  {
    id: "user-rest-3",
    name: "Casa del Forn",
    city: "València",
    cuisine: "Clàssica",
    photo:
      "https://images.unsplash.com/photo-1537047902294-62a40cda9756?auto=format&fit=crop&w=900&q=80",
    source: "ADDED_BY_USER",
    addedAt: "2026-09-08",
    isRated: true,
    personalAverage: 9.2,
    globalAverage: 8.91,
  },
];

export const mockMyRatings = [
  {
    id: "rating-1",
    restaurant: "La Brasa del Port",
    date: "2026-09-03",
    session: "JDC-5824",
    personalScore: 8.8,
    sessionAverage: 8.6,
    globalAverage: 8.72,
    categoryScores: {
      ESPAI: 8,
      CUINA: 9,
      MENJAR: 9,
      POSTRES: 7,
      SERVEI: 9,
      PREU: 8,
      "PLAT ESTRELLA": 10,
    },
  },
  {
    id: "rating-2",
    restaurant: "Casa del Forn",
    date: "2026-09-09",
    session: "JDC-9401",
    personalScore: 9.2,
    sessionAverage: 8.9,
    globalAverage: 8.91,
    categoryScores: {
      ESPAI: 9,
      CUINA: 9,
      MENJAR: 10,
      POSTRES: 8,
      SERVEI: 9,
      PREU: 8,
      "PLAT ESTRELLA": 10,
    },
  },
];

export const sessionParticipants = [
  {
    id: "p1",
    name: "Alicia Roca",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    status: "FINALITZAT",
  },
  {
    id: "p2",
    name: "Pau Mir",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    status: "VOTANT",
  },
  {
    id: "p3",
    name: "Nora Valls",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
    status: "ESPERANT",
  },
];

export const activeSession = {
  code: "JDC-5824",
  title: "Sessió de tast La Brasa del Port",
  restaurant: "La Brasa del Port",
  status: "VOTING",
  participants: sessionParticipants,
  categoryAverages: {
    ESPAI: 8.4,
    CUINA: 8.9,
    MENJAR: 9.1,
    POSTRES: 7.8,
    SERVEI: 8.2,
    PREU: 7.4,
    "PLAT ESTRELLA": 9.3,
  },
  sessionAverage: 8.44,
};

export const searchResults = [
  { id: "sr-1", name: "La Brasa del Port", city: "Barcelona", cuisine: "Marisc i mediterrània" },
  { id: "sr-2", name: "Bocca di Bacco", city: "Barcelona", cuisine: "Italiana" },
  { id: "sr-3", name: "Mikado Sushi", city: "Girona", cuisine: "Japonès" },
];
