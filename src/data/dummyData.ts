import { ValidRoles } from '../auth/interfaces';
import { SeedData } from './interfaces/dummyData.interface';

export const dummyData: SeedData = {
  users: [
    {
      fullName: 'Santiago Restrepo',
      email: 'insoul@hotmail.com',
      password: 'SoulMaster123',
      isActive: true,
      roles: [ValidRoles.admin, ValidRoles.superUser],
    },
    {
      fullName: 'Guillermo Arango',
      email: 'guilliodev@hotmail.com',
      password: 'Guillio123',
      isActive: true,
      roles: [ValidRoles.admin, ValidRoles.superUser],
    },
    {
      fullName: 'Test1',
      email: 'test1@hotmail.com',
      password: 'test1',
      isActive: true,
    },
    {
      fullName: 'test2',
      email: 'test2@hotmail.com',
      password: 'test2',
      isActive: false,
    },
  ],
  sports: [
    {
      name: 'Fútbol',
      description:
        'Deporte de equipo en el que dos equipos de once jugadores intentan marcar goles introduciendo un balón en la portería contraria, utilizando únicamente los pies, la cabeza o el torso.',
      history:
        'Se originó en Inglaterra en el siglo XIX, aunque versiones del fútbol se han jugado en diversas culturas durante siglos.',
    },
    {
      name: 'Baloncesto',
      description:
        'Deporte de ritmo rápido en el que dos equipos de cinco jugadores intentan marcar puntos al lanzar un balón a través de un aro. El juego se desarrolla en una cancha rectangular con un aro en cada extremo.',
      history:
        'Inventado en 1891 por el Dr. James Naismith en Springfield, Massachusetts, como una forma de mantener activos a sus estudiantes durante el invierno.',
    },
    {
      name: 'Tenis',
      description:
        'Deporte en el que los jugadores utilizan raquetas para golpear una pelota por encima de una red hacia el campo del oponente, con el objetivo de marcar puntos haciendo que la pelota caiga dentro de los límites del campo.',
      history:
        'El tenis puede rastrear sus orígenes hasta el siglo XII en Francia, pero el tenis moderno evolucionó en Inglaterra a fines del siglo XIX.',
    },
    {
      name: 'Béisbol',
      description:
        'Deporte de bate y pelota en el que dos equipos de nueve jugadores alternan turnos de bateo y campo. El bateador intenta golpear la pelota y marcar puntos corriendo alrededor de las bases.',
      history:
        'Se originó en Inglaterra en el siglo XVII y evolucionó hacia la versión moderna que conocemos hoy en día en los Estados Unidos en el siglo XIX.',
    },
    {
      name: 'Rugby',
      description:
        'Deporte de contacto en el que dos equipos de 15 jugadores intentan llevar, pasar o patear un balón para marcar puntos, llevándolo a la zona de gol del oponente o pateándolo a través de los postes de gol.',
      history:
        'El rugby se originó en Inglaterra a principios del siglo XIX, con el primer partido jugado en la Rugby School en 1823.',
    },
  ],
};
