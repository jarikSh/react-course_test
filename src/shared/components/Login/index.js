import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogTitle, Box, Link as ButtonLink } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';

import ButtonMain from 'shared/components/ButtonMain';
import FormPasswordField from 'shared/components/FormPasswordField';
import FormTextField from 'shared/components/FormTextField';
import { useUser } from 'shared/context/UserContext';
import { loginSchema } from 'shared/utilities/validation';

import styles from './Login.module.scss';

const Login = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsSignUpModalOpen } = useUser();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = (data) => {
    setIsLoginModalOpen(false);
  };

  const onSwitchToSignUp = () => {
    setIsSignUpModalOpen(true);
  };

  return (
    <Dialog onClose={() => setIsLoginModalOpen(false)} open={isLoginModalOpen}>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogTitle className={styles.title}>Войти в аккаунт</DialogTitle>

          <FormTextField name="email" label="Email" type="email" required />
          <FormPasswordField
            name="password"
            label="Пароль"
            autoComplete="current-password"
            required
          />

          <ButtonMain label="Войти" type="submit"></ButtonMain>
          <ButtonLink component="button" type="button" variant="body2" onClick={onSwitchToSignUp}>
            Регистрация
          </ButtonLink>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export default Login;
