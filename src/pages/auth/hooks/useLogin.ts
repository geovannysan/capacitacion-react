import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { ApiError } from '../../../core/api-error';
import { TOKEN } from '../constants/auth-constants.constant';
import { authService } from '../services/auth.service';

export const loginSchema = z.object({
  email: z.email({
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'el correo no es valido',
  }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

const useLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [user, setUser] = useState<string>();
  const [view, setView] = useState<boolean>(true);
  const formLogin = async (values: LoginFormValues) => {
    try {
      const loginActin = await authService.login(values);
      if (loginActin.status) {
        setUser(loginActin.data.token);
        sessionStorage.setItem(TOKEN, loginActin.data.token);
        navigate('/home');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(error.message);
      }
    } finally {
      reset();
    }
  };
  const haldelview = () => {
    setView((view) => !view);
  };

  return { formLogin, register, handleSubmit, errors, user, setView: haldelview, view };
};
export default useLogin;
