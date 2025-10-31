export default (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Crear un array con los nombres de los meses en español
  const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  const month = monthNames[date.getUTCMonth()];

  return `${day} ${month}, ${year}`;
};
