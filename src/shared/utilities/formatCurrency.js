const CURRENCY_FORMATTER = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency',
  maximumFractionDigits: 0
});

export const formatCurrency = (number) => CURRENCY_FORMATTER.format(number);
