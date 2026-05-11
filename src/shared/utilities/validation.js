import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required('Введите имя'),
  middleName: yup.string(),
  surname: yup.string(),
  email: yup.string().email('Не валидный Email').required('Введите email'),
  password: yup
    .string()
    .min(6, 'Пароль должен состоять минимум из 6 символов.')
    .required('Введите пароль'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароль должен совпадать.'),
  isAgreed: yup.bool().required().oneOf([true], 'Необходимо согласиться с условиями использования.')
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Не валидный Email').required('Введите email'),
  password: yup.string().required('Введите пароль')
});

export const shippingSchema = yup.object().shape({
  name: yup.string().required('Введите имя'),
  email: yup.string().email('Не валидный Email').required('Введите email'),
  city: yup.string().required('Введите населенный пункт'),
  address: yup.string().required('Введите адрес'),
  entrance: yup.string().matches(/^\d*$/, 'Введите число'),
  floor: yup.string().matches(/^\d*$/, 'Введите число'),
  apartment: yup.string(),
  sendEmail: yup.bool(),
  payment: yup.string().required('Выберите тип оплаты')
});
