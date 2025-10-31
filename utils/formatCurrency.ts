export default (amount: number, currency: string = 'EUR', symbol: string = '€', position: string = 'after') => {
  // Redondear a dos decimales
  const formattedAmount = amount.toFixed(2).replace('.', ',');

  // Posición del símbolo
  if (position === 'before') {
    return `${symbol}${formattedAmount}`;
  }

  return `${formattedAmount} ${symbol}`;
};
