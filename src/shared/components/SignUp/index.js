import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogTitle, Box, Link as ButtonLink } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import ButtonMain from 'shared/components/ButtonMain';
import FormCheckbox from 'shared/components/FormCheckbox';
import FormPasswordField from 'shared/components/FormPasswordField';
import FormTextField from 'shared/components/FormTextField';
import { useUser } from 'shared/context/UserContext';
import { registerSchema } from 'shared/utilities/validation';

import styles from './SignUp.module.scss';

const SignUp = () => {
  const { isSignUpModalOpen, setIsLoginModalOpen, setIsSignUpModalOpen } = useUser();

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      middleName: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAgreed: false
    }
  });

  const onSubmit = (data) => {
    setIsSignUpModalOpen(false);
  };

  const onSwitchToLogin = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <Dialog onClose={() => setIsSignUpModalOpen(false)} open={isSignUpModalOpen}>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogTitle className={styles.title}>Регистрация</DialogTitle>
          <Box className={styles.formRow}>
            <FormTextField name="name" label="Имя" required />
            <FormTextField name="middleName" label="Отчество" />
          </Box>
          <FormTextField name="surname" label="Фамилия" />
          <FormTextField name="email" label="Email" type="email" required />
          <FormPasswordField name="password" label="Пароль" autoComplete="new-password" required />
          <FormPasswordField
            name="confirmPassword"
            label="Повторите пароль"
            autoComplete="new-password"
            required
          />
          <FormCheckbox
            name="isAgreed"
            className={styles.agreement}
            label={
              <div>
                <span>Я согласен с </span>{' '}
                <Link to={'/terms'} target="_blank">
                  Условиями использования
                </Link>
              </div>
            }
          />

          <ButtonMain label="Создать аккаунт" type="submit"></ButtonMain>
          <ButtonLink component="button" type="button" variant="body2" onClick={onSwitchToLogin}>
            или Войти в аккаунт
          </ButtonLink>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default SignUp;
