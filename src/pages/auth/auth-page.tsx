import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { AnimatePresence } from 'motion/react';

import { LoginForm } from './components/LoginForm';
import RecoveryPassword from './components/RecoveryPassword';
import useLogin from './hooks/useLogin';
import { LeftPage } from '../../components/LeftPage';

const AuthPage = () => {
  const { formLogin, handleSubmit, register, errors, setView, view } = useLogin();
  return (
    <div>
      <Box sx={{ minHeight: '100vh', display: 'flex' }}>
        <LeftPage />
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            {view ? (
              <LoginForm
                key="login"
                register={register}
                handleSubmit={handleSubmit}
                vieW={view}
                setView={setView}
                onSubmit={formLogin}
                errors={errors}
              />
            ) : (
              <RecoveryPassword key="recovery" setView={setView} vieW={false} />
            )}
          </AnimatePresence>
        </Box>
      </Box>
      <Container
        maxWidth="sm"
        style={{
          display: 'none',
        }}
      >
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          className="box-shadow"
          height={'100'}
        >
          <form onSubmit={handleSubmit(formLogin)}>
            <FormControl sx={{ m: 1, width: '90%' }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input {...register('email')} id="email" aria-describedby="my-helper-text" />
            </FormControl>
            {errors.email && (
              <Typography variant="body1" color="error">
                {errors.email.message}
              </Typography>
            )}
            <FormControl sx={{ m: 1, width: '90%' }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input {...register('password')} id="password" aria-describedby="my-helper-text" />
            </FormControl>

            {errors.password && (
              <Typography variant="body1" color="error">
                {errors.password.message}
              </Typography>
            )}
            <FormControl sx={{ m: 1, width: '90%' }}>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Container>
    </div>
  );
};

export default AuthPage;
