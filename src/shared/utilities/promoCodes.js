export const PROMO_CODES = [
  {
    code: 'SAVE10',
    discountPercent: 10,
    description: 'Скидка 10%',
    expirationDate: '2026-12-31',
    minimumOrderAmount: 0
  },
  {
    code: 'FIRST20',
    discountPercent: 20,
    description: 'Скидка 20% на первый заказ',
    expirationDate: '2026-12-31',
    minimumOrderAmount: 5000
  },
  {
    code: 'FLAT500',
    discountAmount: 500,
    description: 'Скидка 500 ₽',
    expirationDate: '2026-12-31',
    minimumOrderAmount: 2000
  }
];

export const validatePromoCode = (code, cartTotal) => {
  if (!code || !code.trim()) {
    return { valid: false, error: 'Введите промокод' };
  }

  const upperCode = code.trim().toUpperCase();
  const promo = PROMO_CODES.find((p) => p.code === upperCode);

  if (!promo) {
    return { valid: false, error: 'Промокод не найден' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(promo.expirationDate);
  if (expiry < today) {
    return { valid: false, error: 'Срок действия промокода истёк' };
  }

  if (cartTotal < promo.minimumOrderAmount) {
    return {
      valid: false,
      error: `Промокод применяется от ${promo.minimumOrderAmount} ₽`
    };
  }

  return { valid: true, promo };
};

export const calculateDiscount = (promo, cartTotal) => {
  if (!promo) return 0;
  if (promo.discountAmount) {
    return Math.min(promo.discountAmount, cartTotal);
  }
  if (promo.discountPercent) {
    return Math.round((cartTotal * promo.discountPercent) / 100);
  }
  return 0;
};
